import { NextResponse } from "next/server";
import { plainToClass } from "class-transformer";
import { validateOrReject } from "class-validator";
import UserSignee from "@/models/user-model";
import { CreateUserDto } from "@/services/DTOs/User";

export async function POST(request: Request) {
   const data = await request.json();

   try {
      try {
         const createUserDto: CreateUserDto = plainToClass(CreateUserDto, data);
         await validateOrReject(createUserDto);
      } catch (error) {
         console.error("Validation error", error);
         return NextResponse.json({ error }, { status: 422 });
      }

      const existingUser = await UserSignee.findOne(data);
      if (existingUser) {
         return new Response(null, {
            status: 204,
         });
      }
      const newUser = new UserSignee({
         ...data,
      });

      await newUser.save();
      return NextResponse.json({ message: "User created successfully" }, { status: 201 }); // Use 201 Created
   } catch (error) {
      console.error("api/user server Error: ", error);
      return NextResponse.json({ error }, { status: 500 });
   }
}
