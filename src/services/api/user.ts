const baseurl = process.env.PROD_BASE_URL;

const addNewUserWallet = async (signeeWalletAddress: string | undefined) => {
   try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
         method: "POST",
         body: JSON.stringify({ signeeWalletAddress }),
      });
      const newUser = await response.json();
      return newUser;
   } catch (error) {
      console.log("Failed calling api/user endpoint: ", error);
   }
};

export { addNewUserWallet };
