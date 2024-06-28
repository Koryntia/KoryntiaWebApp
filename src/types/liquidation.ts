import { ILoanRequest } from "@/interfaces/loan-interface";

export type LiquidationModalProps = {
   open: boolean;
   handleClose: () => void;
   data: ILoanRequest;
};

export type CurrencyOption = {
   name: string;
   value: string;
};
