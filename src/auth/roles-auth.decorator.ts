//создадим конст с ключом, и по этому ключу сможем получать метаданные внутри guard
import {SetMetadata} from "@nestjs/common";

export const ROLES_KEY = 'roles';
//создадим Roles которая декоратор, принимает массив стринговых ролей
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);