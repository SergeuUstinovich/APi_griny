import { ProxyType } from "src/proxy/proxy-type.enum";

export class CreateProxyMaksDto {
    proxy: string[];
    type: ProxyType;
}