import { IsEnum, IsLowercase, IsNotEmpty, IsString, MaxLength, Validate } from "class-validator";
import { Category } from "../enums/category/category"
import { IsAlphaDash } from "src/common/validators/IsAlphaDash";

export class CreateItemTypeDto {
    @IsNotEmpty()
    @IsString()    
    @IsEnum(Category)
    category: Category;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @IsLowercase()
    @Validate(IsAlphaDash)
    // unique on entity
    code: string;

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
