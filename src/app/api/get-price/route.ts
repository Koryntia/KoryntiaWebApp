import { NextResponse } from "next/server";
import { ethers } from "ethers";
import { validateOrReject } from "class-validator";
import { plainToClass } from "class-transformer";
import { GetPriceDTO } from "@/services/DTOs/PriceGet";
import { getTokenAddress } from "@/constant/tokens";
import BlockchainService from '@/services/contract-services/loan-service';
import config from "@/utils/config";

export async function GET(req: Request) {
   const url = new URL(req.url);
   const query = {
      tokenPair: url.searchParams.get("tokenPair"),
   };

   // Extract signature and address from headers
   const signature = req.headers.get('X-Signature');
   const address = req.headers.get('X-Address');
   
   const message = `Fetching price for ${query.tokenPair}`;

   if (!signature || !address) {
      return NextResponse.json({ message: "Missing signature or address" }, { status: 401 });
   }

   try {
      // Verify the signature
      const recoveredAddress = ethers.utils.verifyMessage(message, signature);

      if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
         return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
      }

      // Validate input
      const getPriceDto = plainToClass(GetPriceDTO, query);
      await validateOrReject(getPriceDto);

      if (!query.tokenPair) return NextResponse.json({ message: "Pair not passed" }, { status: 400 });

      // Check token pair validation
      const isValidPair = (pair: string) => /^[A-Z]+\/USD$/.test(pair);
      if (!isValidPair(query.tokenPair)) {
         return NextResponse.json({ message: "Token pair must be in the format 'XXX/USD'" }, { status: 400 });
      }

      // Create a provider and a signer based on the recovered address
      const provider = new ethers.JsonRpcProvider(config.RPC_URL);
      const signer = provider.getSigner(recoveredAddress);

      // Initialize your service with the signer
      const service = new BlockchainService(signer);

      // Fetch token price using the service with signer
      const tokenAddress = getTokenAddress(query.tokenPair.toUpperCase());
      const tokenPrice = await service.getTokenPrice(tokenAddress);

      return NextResponse.json({ token: query.tokenPair, price: tokenPrice }, { status: 200 });
   } catch (error) {
      console.error("Error", error);
      return NextResponse.json({ message: "Validation failed", error }, { status: 400 });
   }
}
