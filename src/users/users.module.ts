//создали набрав:nest generate module users
import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthService} from "../auth/auth.service";
import {AuthModule} from "../auth/auth.module";
import { Post } from 'src/posts/posts.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      SequelizeModule.forFeature([User, Role, UserRoles, Post]),
      RolesModule, //чтобы модуль RolesModule импортировался вместе с сервисом
      //в roles.module добавляем сервис в exports
      forwardRef(() => AuthModule)
  ],
    exports: [
        UsersService,
    ]
})
export class UsersModule {}
