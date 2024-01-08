const baseurl = process.env.PROD_BASE_URL

const addNewUserWallet = async (signeeWalletAddress: string | undefined) => {

    try {
        const response = await fetch(`http://localhost:3000/api/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ signeeWalletAddress }),
        });
        const newUser = await response.json();
        return newUser;
    } catch (error) {
        console.log("Failed calling api/user endpoint: ", error);

    }
};


export { addNewUserWallet };
