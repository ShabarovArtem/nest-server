import { Injectable } from '@nestjs/common';
import {CreateRoleDto} from "./dto/create-role.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./roles.model";


@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRepository: typeof Role ) {}

    //создание роли
    async createRole(dto: CreateRoleDto){
//научим метод делать записи в базу данных
        const role = await this.roleRepository.create(dto);
        return role;
    }
    //получение роли
    async getRoleByValue(value:string){
    const role = await this.roleRepository.findOne({where: {value}});
    return role;
    }



}
