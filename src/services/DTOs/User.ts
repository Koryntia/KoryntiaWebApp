import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Signee wallet address is required' })
  @IsString({ message: 'Signee wallet address must be a string' })
  signeeWalletAddress: string;
}