import { IsString } from "class-validator";

export class GetPriceDTO {
   @IsString()
   tokenPair: string;
}
