import { Controller, Post, Body } from '@nestjs/common';
import { UserDto } from './user-dto';
import { User } from './user';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Post()
    async create(@Body() user: UserDto): Promise<User> {
        return this.service.save(new User(user.name))
    }
}
