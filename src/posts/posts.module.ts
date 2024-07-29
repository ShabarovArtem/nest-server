//nest generate module posts

import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "../roles/roles.model";
import {Post} from "./posts.model";
import {UserRoles} from "../roles/user-roles.model";
import {User} from "../users/users.model";

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
      SequelizeModule.forFeature([User, Post])
  ]
})
export class PostsModule {}
