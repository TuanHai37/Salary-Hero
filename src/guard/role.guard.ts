import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../common/enums/role.enum';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) {
      return true;
    }

    const user = {
      name: 'Sea',
      role: Role.Employee,
      user_id: 1,
      company_id: 1,
      email: 'tuanhaicr69@gmail.com',
      code: 'uudi',
      salary: 321.23,
    };

    return requireRoles.some((role) => user.role.includes(role));
  }
}
