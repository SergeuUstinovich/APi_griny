import { ProxyTypeMaks } from "../proxy-maks-type.enum";

export class CreateProxyMaksDto {
    proxy: string[];
    type: ProxyTypeMaks;
}