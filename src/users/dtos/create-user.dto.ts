import { IsArray, IsEnum, IsOptional, IsString, IsBoolean } from 'class-validator';

export enum ControlLevel { READ_ONLY = 'READ_ONLY', READ_WRITE = 'READ_WRITE' }
export enum AppModuleDto { SCHOOL='SCHOOL', ROUTE='ROUTE', TRACKING='TRACKING', SCHEDULING='SCHEDULING' }

export class CreateUserDto {
  @IsString() username: string;
  @IsString() password: string;
  @IsString() roleCode: string;            // e.g. FLEET_MANAGER

  @IsArray() terminalCodes: string[];      // ['T1','T3']
  @IsArray() modules: AppModuleDto[];      // ['SCHOOL','ROUTE']
  @IsEnum(ControlLevel) control: ControlLevel;

  @IsOptional() @IsBoolean() isActive?: boolean;
}
