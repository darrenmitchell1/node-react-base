import { IsDateString, IsDecimal, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Max, MaxLength, Min, MinLength } from "class-validator";
import { Frequency } from "../enums/frequency/frequency";
import { Flow } from "../enums/flow/flow";

export class CreateItemDto {
    @IsNotEmpty()
    @IsUUID()
    // check exists on item-type entity
    item_type_id: string;

    @IsNotEmpty()
    @IsString()    
    @IsEnum(Flow)
    flow: Flow;

    @IsNotEmpty()
    @IsString()    
    @IsEnum(Frequency)
    frequency: Frequency;

    @IsDateString()
    @MinLength(10)  // ensures YYYY-MM-DD format
    @MaxLength(10)  // ensures YYYY-MM-DD format
    start_date: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(1, {validateIf: (o: CreateItemDto) => o.frequency === 'single'})
    number_of_transactions: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(2000)
    descriptiom: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    company_name: string;
    
    @IsNotEmpty()
    @IsDecimal({decimal_digits: '2', force_decimal: true})
    @Min(0.01)
    amount: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    reference: string;
}
