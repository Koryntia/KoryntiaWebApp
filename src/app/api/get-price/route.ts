import { NextResponse } from "next/server";
import { validateOrReject } from "class-validator";
import { plainToClass } from "class-transformer";
import { GetPriceDTO } from "@/services/DTOs/PriceGet";
import { getTokenAddress } from "@/constant/tokens";
import { getTokenPrice } from "@/services/api/oracle";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = {
    tokenPair: url.searchParams.get("tokenPair"),
  };
  try {
    try {
      const getPriceDto = plainToClass(GetPriceDTO, query);
      await validateOrReject(getPriceDto);
    } catch (error) {
      console.error("Validation error", error);
      return NextResponse.json({ error }, { status: 422 });
    }

    if (!query.tokenPair)
      return NextResponse.json({ message: "Pair not passed" }, { status: 400 });

    // check validation
    const isValidPair = (pair: string) => /^[A-Z]+\/USD$/.test(pair);

    if (!isValidPair(query.tokenPair)) {
      return NextResponse.json(
        { message: "Token pair must be in the format 'XXX/USD'" },
        { status: 400 }
      );
    }
    const tokenAddress = getTokenAddress(query.tokenPair.toUpperCase());
    const tokenPrice = await getTokenPrice(tokenAddress);
    return NextResponse.json(
      { token: query.tokenPair, price: tokenPrice },
      { status: 200 }
    );
  } catch (errors) {
    return NextResponse.json(
      { message: "Validation failed", errors },
      { status: 400 }
    );
  }
}
