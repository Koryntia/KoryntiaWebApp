"use server";

export async function registerUser(address: String) {
   try {
      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/user", {
         method: "POST",
         body: JSON.stringify({ signeeWalletAddress: address }),
      });
   } catch (error) {
      console.log(error);
   }
}
