import { Controller, Get, HttpStatus, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/CreateUser.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    async getAllUsers() {
        const users = await this.usersService.getAllUsers();
        return {
            statusCode : HttpStatus.OK,
            message: 'User fetch successfully',
            users
        }    
    }

    @Post()
    async createUsers(@Body() data: CreateUserDto) {
        const user = await this.usersService.createUser(data);
        return {
            statusCode: HttpStatus.OK,
            message: 'User created successfully',
            user
        };
    }
}
