//опишем схему того, как пользователь будет сохраняться в базе данных
import {BelongsToMany, Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import { Post } from 'src/posts/posts.model';


//необходим для создания объекта класса User
interface UserCreationAttrs {
    email: string;
    password: string;
}

//Чтобы класс стал таблицей помечаем его @Table, tableName: её название
@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    //чтобы были колонки @Column
    //type - тип данных, unique - уникальность, autoIncrement и так понятно, primaryKey - первичный ключ
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false}) //allowNull может ли быть не указанным
    email: string;

    @ApiProperty({example: '12345678', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'true', description: 'Забанен или нет'})
    @Column({type: DataType.BOOLEAN, defaultValue: false}) // defaultValue - значение изначально
    banned: boolean;

    @ApiProperty({example: 'За хулиганство', description: 'Причина блокировки'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    //(связь многие ко многим) это связанно с файлом roles.model
    @BelongsToMany(() => Role, (role) => UserRoles)
    roles: Role[];

    @HasMany(() => Post)
    posts: Post[];

}