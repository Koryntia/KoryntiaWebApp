import { NextResponse } from 'next/server';
import LoanModel from '@/models/loan-model';

export async function GET(req: Request) {
  if (req.method === 'GET') {
    try {
      // Find loans ready for liquidation
      const loans = await LoanModel.find({
        $or: [
          { loanPeriod: { $lt: new Date() } }, // Loan repayment deadline has passed
          { healthFactor: { $lt: 1.0 } }, // Health factor is below unity
        ],
      });

      return NextResponse.json(loans, { status: 200 });
    } catch (error) {
      console.error('Error fetching loans ready for liquidation:', error);
      return NextResponse.json({ message: 'Failed to fetch loans ready for liquidation' }, { status: 500 });
    }
  } else {
    const response = NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 });
    response.headers.set('Allow', 'GET');
    response.headers.set('Content-Type', 'application/json');
    return response;
  }
}
