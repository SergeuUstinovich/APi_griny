import { IsBoolean, IsString } from 'class-validator';

export class ToggleDomainItemDto  {
  @IsString()
  readonly domain!: string;

  @IsBoolean()
  readonly isActive!: boolean;
}
