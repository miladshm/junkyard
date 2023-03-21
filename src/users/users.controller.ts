import {Body, Controller, Delete, Get, Param, Post, Query, UseInterceptors} from '@nestjs/common';
import {createUserDto} from './dtos/create-user.dto';
import {UsersService} from './users.service';
import {SerializeInterceptor} from "../interceptors/serialize.interceptor";

@Controller('auth')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @Post('signup')
    createUser(@Body() body: createUserDto) {
        this.usersService.create(body.email, body.password);
    }

    @UseInterceptors(SerializeInterceptor)
    @Get(':id')
    findUser(@Param('id') id: string) {
        return this.usersService.findOne(parseInt(id));
    }

    @Get()
    findByEmail(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Delete(':id')
    removeUser(@Param('id') id: string) {
        this.usersService.remove(parseInt(id));
    }

}
