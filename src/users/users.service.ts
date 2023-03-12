import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private repo: Repository<User>
    ) {
    }

    create(email: string, password: string) {
        const user = this.repo.create({email, password});

        return this.repo.save(user);
    }

    async findOne(id: number): Promise<User> {
        const user = await this.repo.findOneBy({id});
        if (!user)
            throw new NotFoundException('User not found');

        return user;
    }

    async find(email: string): Promise<User[]> {
        const user = await this.repo.findBy({email});
        if (!user)
            throw new NotFoundException('User not found');
        return user;
    }


    async update(id: number, data: Partial<User>) {

        const user = await this.findOne(id);

        Object.assign(user, data);

        return this.repo.save(user);
    }


    async remove(id: number) {
        const user = await this.findOne(id);

        return await this.repo.remove(user);
    }
}
