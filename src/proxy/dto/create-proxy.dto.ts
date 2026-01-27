import { ProxyType } from "../proxy-type.enum";

export class CreateProxyDto {
    proxy: string[];
    type: ProxyType;
}