import { Controller, Get, HttpStatus, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { UpdateUserDto } from 'src/dto/UpdateUser.dto';
import { Messages } from 'src/constants/Messages.data';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    async getAllUsers() {
        const users = await this.usersService.getAllUsers();
        return {
            statusCode : HttpStatus.OK,
            message: 'Users fetch successfully',
            users
        }    
    }

    @Get(':id')
    async getUserById(@Param('id') id: number) {
        const user = await this.usersService.findById(id);
        if(!user){
            throw new NotFoundException(`${Messages.EMPLOYEE_NOT_EXSIST}`)
        }

        return {
            statusCode: HttpStatus.OK,
            message: 'User fetch successfully',
            user
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

    @Put(':id')
    async uppdateUser(@Param('id') id: number, @Body() data: UpdateUserDto) {
        const user = await this.usersService.updateUser(id, data);
        if (!user) {
            throw new NotFoundException(`${Messages.EMPLOYEE_NOT_EXSIST}`)
        }

        return {
            statusCode: HttpStatus.OK,
            message: 'User updated successfully',
        };
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        const user = await this.usersService.deleteUser(id);
        if (!user.deleted) {
            throw new NotFoundException(`${Messages.EMPLOYEE_NOT_EXSIST}`)
        }

        return {
            statusCode: HttpStatus.OK,
            message: 'User deleted successfully',
        };
    }
}
