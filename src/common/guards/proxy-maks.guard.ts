import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ProxyMaksKeyGuard implements CanActivate {
  private readonly validKeys = ['rk.xlkzvfrcf']; // тут твои ключи

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
