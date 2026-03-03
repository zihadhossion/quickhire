import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpResponsePayloadDto, OtpVerifyResponseDto } from 'src/shared/dtos';
import { QueryFailedError, Repository } from 'typeorm';
import { SendOtpDto, VerityOtpDto } from './dtos';
import { Otp } from './otp.entity';
import { User } from '@modules/users';
import { UtilsService } from '@infrastructure/utils/utils.service';

@Injectable()
export class OtpService {
    constructor(
        @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly utilsService: UtilsService,
    ) {}

    async send(data: SendOtpDto): Promise<OtpResponsePayloadDto> {
        try {
            const otp = this.utilsService.generateUniqueOTP(4);
            const expiresAt = new Date();

            expiresAt.setMinutes(expiresAt.getMinutes() + 2);

            const emailOtp = await this.otpRepository.findOne({
                where: { email: data.email },
            });

            if (!emailOtp) {
                await this.otpRepository.save({
                    email: data.email,
                    otp: otp,
                    expiresAt: expiresAt,
                });
            } else {
                await this.otpRepository.update(emailOtp.id, {
                    otp: otp,
                    expiresAt: expiresAt,
                });
            }

            // Log OTP only in development mode (security risk in production)
            if (process.env.MODE === 'DEV') {
                console.log(`OTP for ${data.email}: ${otp}`);
            }
            // await this.mailService.sendRegistrationOtpEmail(data.email, otp);

            return {
                success: true,
                statusCode: 200,
                message: 'OTP sent successfully (expires in 2 minutes)',
                expiresAt: expiresAt,
                status: 'OK',
            } as OtpResponsePayloadDto;
        } catch (error: any) {
            if (
                error instanceof QueryFailedError &&
                error.driverError?.code === '23505'
            ) {
                const detailMessage: string = error.driverError.detail || '';
                const { columnName, value } =
                    this.utilsService.extractColumnNameFromError(detailMessage);

                const errorResponse: any = {
                    success: false,
                    message: 'Duplicate entry',
                    field: columnName,
                    value: value,
                };

                throw new ConflictException(errorResponse);
            }
            throw new InternalServerErrorException(error.message);
        }
    }

    async verify(data: VerityOtpDto): Promise<OtpVerifyResponseDto> {
        try {
            const emailOtp = await this.otpRepository.findOne({
                where: { email: data.email },
            });

            if (!emailOtp)
                return {
                    success: false,
                    message: 'OTP verification failed',
                    isValid: false,
                    statusCode: 400,
                };

            if (emailOtp.otp != data.otp)
                return {
                    success: false,
                    message: 'Invalid OTP code',
                    isValid: false,
                    statusCode: 400,
                };

            const now = new Date();
            if (now > emailOtp.expiresAt) {
                return {
                    success: false,
                    message: 'OTP has expired',
                    isValid: false,
                    statusCode: 400,
                };
            }

            const user = await this.userRepository.findOne({
                where: { email: data.email },
            });

            if (user && !user.isVerified) {
                await this.userRepository.update(
                    { email: data.email },
                    { isVerified: true },
                );
            }

            await this.otpRepository.remove(emailOtp);

            return {
                success: true,
                message: 'OTP verification successful',
                isValid: true,
                statusCode: 200,
                isVerified: true,
            } as OtpVerifyResponseDto;
        } catch (error: any) {
            if (
                error instanceof QueryFailedError &&
                error.driverError?.code === '23505'
            ) {
                const detailMessage: string = error.driverError.detail || '';
                const { columnName, value } =
                    this.utilsService.extractColumnNameFromError(detailMessage);

                const errorResponse: any = {
                    success: false,
                    message: 'Duplicate entry',
                    field: columnName,
                    value: value,
                };

                throw new ConflictException(errorResponse);
            }
            throw new InternalServerErrorException(error.message);
        }
    }
}
