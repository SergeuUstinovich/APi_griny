import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  private readonly username = 'admin';
  private readonly password = 'ckj;ysqgfhjkm';

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      res
        .status(401)
        .setHeader('WWW-Authenticate', 'Basic realm="Courier UI"')
        .send('Unauthorized');
      return false;
    }

    const base64Credentials = authHeader.split(' ')[1];
    const [user, pass] = Buffer.from(base64Credentials, 'base64')
      .toString()
      .split(':');

    if (user !== this.username || pass !== this.password) {
      res
        .status(401)
        .setHeader('WWW-Authenticate', 'Basic realm="Courier UI"')
        .send('Unauthorized');
      return false;
    }

    return true;
  }
}
