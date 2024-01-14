import { baseUrl } from "@/shared/constant";

const createNewLoan = async (loanData: any) => {

    try {
        const response = await fetch(`${baseUrl}/api/loan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loanData),
        });
        const newLoan = await response.json();
        return newLoan;
    } catch (error) {
        console.log("Failed creating new loan, api/loan: ", error);

    }
};

export { createNewLoan };
