import { PartialType } from '@nestjs/mapped-types';
import { CreateItemTypeDto } from './create-item-type.dto';
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdateItemTypeDto extends PartialType(CreateItemTypeDto) {
    @IsNotEmpty()    
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    // case insensitive ignoring space unique on entity
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(2000)
    descriptiom: string;
}
