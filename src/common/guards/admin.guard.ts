import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const adminKey = request.headers['x-admin-key'];

    if (adminKey !== 'organizer-secret-admin-key') {
      throw new ForbiddenException('Admin access required');
    }

    return true;
  }
}
