import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";

@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @Get('/:value')
    //будет динамически изменяющийся участок пути. в котором value будем добавлять
    //чтобы value вытащить необходим @Param, в который передаём название динамически
    //изменя.щегося участка пути
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value);
    }


}
