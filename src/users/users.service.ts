import { Injectable } from '@nestjs/common';
import { User } from 'src/todo/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      username: 'admin',
      password: bcrypt.hashSync('admin123', 10),
    },
  ];

  findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
