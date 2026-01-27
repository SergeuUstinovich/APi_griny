import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ProxyKeyGuard implements CanActivate {
  private readonly validKeys = ['rk.xlkzuhbis'];

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // читаем ключ из query параметров
    const apiKey = request.query.xapikey;

    if (!apiKey || !this.validKeys.includes(apiKey)) {
      throw new UnauthorizedException('Неверный или отсутствующий API ключ');
    }

    return true;
  }
}
