import { ProxyType } from "../../proxy/proxy-type.enum";

export class CreateProxyMaksDto {
    proxy: string[];
    type: ProxyType;
}