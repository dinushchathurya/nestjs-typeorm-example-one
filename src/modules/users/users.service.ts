import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/entities/user.entity';
import { CreateUserDto } from '../../dto/CreateUser.dto';
import { FindUserDto } from '../../dto/FindUser.dto';
import { UpdateUserDto } from '../../dto/UpdateUser.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async getAllUsers() {
        return await this.userRepository.find();
    }

    async findById(id: number) {
        return await this.userRepository.findOne({
            where: {
                id: id
            }
        })
    }

    async findByEmail(email: string): Promise<FindUserDto> {
        return await this.userRepository.findOne({
            where: {
                email: email
            }
        })
    }

    async createUser(data: CreateUserDto) {
        const user = this.userRepository.create(data);
        await this.userRepository.save(data);
        return user;
    }

    async updateUser(id: number, data: UpdateUserDto) {
        await this.userRepository.update({id} ,data);
        return await this.userRepository.findOne({id});
    }

    async deleteUser(id: number) {
        await this.userRepository.delete({id});
        return { deleted: true};
    }

}
