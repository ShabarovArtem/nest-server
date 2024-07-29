//опишем схему того, как пользователь будет сохраняться в базе данных
import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript';
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {UserRoles} from "./user-roles.model";

//необходим для создания объекта класса User
interface RoleCreationAttrs {
    value: string;
    description: string;
}

//Чтобы класс стал таблицей помечаем его @Table, tableName: её название
@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {
    //чтобы были колонки @Column
    //type - тип данных, unique - уникальность, autoIncrement и так понятно, primaryKey - первичный ключ
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'ADMIN', description: 'Уникальное значение роли'})
    @Column({type: DataType.STRING, unique: true, allowNull: false}) //allowNull может ли быть не указанным
    value: string;

    @ApiProperty({example: 'Администратор', description: 'Описание роли'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    //(связь многие ко многим) это связанно с файлом users.model
    @BelongsToMany(() => User, (role) => UserRoles)
    users: User[];

}