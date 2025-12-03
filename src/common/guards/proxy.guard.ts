import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ProxyKeyGuard implements CanActivate {
  private readonly validKeys = ['rk.xlkzuhbis']; // тут твои ключи

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey || !this.validKeys.includes(apiKey)) {
      throw new UnauthorizedException('Неверный или отсутствующий API ключ');
    }

    return true;
  }
}
