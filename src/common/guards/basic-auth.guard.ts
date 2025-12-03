import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  private readonly username = 'admin';
  private readonly password = 'ckj;ysqgfhjkm';

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new UnauthorizedException('Unauthorized');
    }

    const base64Credentials = authHeader.split(' ')[1];
    const [user, pass] = Buffer.from(base64Credentials, 'base64')
      .toString('utf-8')
      .split(':');

    if (user !== this.username || pass !== this.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return true;
  }
}
