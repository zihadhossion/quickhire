import { Injectable, ConflictException } from '@nestjs/common';
import { BaseService } from 'src/core/base';
import { PasswordUtil } from 'src/core/utils';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { ResponsePayloadDto } from '@shared/dtos/response.dto';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(private readonly userRepository: UserRepository) {
        super(userRepository, 'User');
    }

    async createUser(
        createUserDto: CreateUserDto,
    ): Promise<ResponsePayloadDto<User>> {
        const existingUser = await this.userRepository.findByEmail(
            createUserDto.email,
        );
        if (existingUser) {
            if (process.env.MODE === 'DEV') {
                console.log(
                    '[UserService] Throwing conflict with email:',
                    createUserDto.email,
                );
            }

            throw new ConflictException(
                `A user with the email ${createUserDto.email} already exists.`,
            );
        }

        const hashedPassword = await PasswordUtil.hash(createUserDto.password);

        const user = await this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });

        return new ResponsePayloadDto({
            success: true,
            statusCode: 201,
            message: 'User created successfully',
            data: user,
            timestamp: new Date().toISOString(),
        });
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        if (updateUserDto.password) {
            updateUserDto.password = await PasswordUtil.hash(
                updateUserDto.password,
            );
        }

        const updated = await this.update(id, updateUserDto);
        if (!updated) {
            return this.findByIdOrFail(id);
        }
        return updated;
    }

    /**
     * Find user by email
     */
    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }

    /**
     * Get all active users
     */
    async getActiveUsers(): Promise<User[]> {
        return this.userRepository.findActiveUsers();
    }
}
