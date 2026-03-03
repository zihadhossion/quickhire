import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

//DB
import { TypeOrmModule } from '@nestjs/typeorm';
import { appDataSource } from './config/db.config';

//Config
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CorsMiddleware } from './core/middleware';
import { UserModule } from './modules/users';
import { AuthModule } from './modules/auth';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard, JwtStrategy } from './core/guards';
import { OtpModule } from '@modules/otp/otp.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { ApplicationModule } from './modules/applications/application.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'src/shared/icons'),
            serveRoot: '/diagnosis-icons',
        }),
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), 'src', 'test'),
            serveRoot: '/test',
        }),
        ConfigModule.forRoot({
            load: [jwtConfig],
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(appDataSource.options),
        ThrottlerModule.forRoot([
            {
                ttl: 60000,
                limit: 10,
            },
        ]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        UserModule,
        AuthModule,
        OtpModule,
        JobsModule,
        ApplicationModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CorsMiddleware).forRoutes('*');
    }
}
