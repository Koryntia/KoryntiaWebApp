const baseurl = process.env.PROD_BASE_URL

const addNewUserWallet = async (signeeWalletAddress: string | undefined) => {

    console.log("baseurl", baseurl);

    const response = await fetch(`http://localhost:3000/api/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ signeeWalletAddress }),
    });
    const newUser = await response.json();
    return newUser;
};


export { addNewUserWallet };
