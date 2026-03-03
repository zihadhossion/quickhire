import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { User } from '../users/user.entity';
import { PASSPORT_AUTH_TOKEN } from '@config/static-data.config';
import { TokenModule } from '@infrastructure/token/token.module';
import { UtilsModule } from '@infrastructure/utils/utils.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        UserModule,
        TokenModule,
        UtilsModule,
        PassportModule.register({
            defaultStrategy: PASSPORT_AUTH_TOKEN,
            property: 'user',
            session: false,
        }),
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY || 'fallback-secret',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, Logger],
    exports: [AuthService],
})
export class AuthModule {}
