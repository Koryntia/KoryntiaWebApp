import toast from "react-hot-toast";

class MessageHandler {
  private static instance: MessageHandler = new MessageHandler();

  public static get() {
    return this.instance;
  }

  handleError(error: string) {
    const errorMap: { [key: string]: string } = {
      'LoanPositionManager__LoanParams_LiquidationThreshold': 'Invalid liquidation threshold parameters',
      'LoanPositionManager__LoanParams_InitialThreshold': 'Invalid initial threshold parameters',
      'LoanPositionManager__LoanParams_LoanAmount': 'Invalid loan amount parameter',
      'LoanPositionManager__LoanParams_CollateralAmount': 'Invalid collateral amount parameter',
      'LoanPositionManager__LoanParams_RepayDeadline': 'Invalid repayment deadline',
      'LoanPositionManager__LoanParams_RequestDeadline': 'Invalid request deadline',
      'LoanPositionManager__LoanParams_InterestRate': 'Invalid interest rate',
      'LoanPositionManager__LoanParams_Applicant': 'Invalid applicant information',
      'LoanPositionManager__Loan_AlreadyInitialized': 'Loan already initialized',
      'LoanPositionManager__TokenNotAvailable': 'The requested token is not available',
      'LoanPositionManager__LoanNotFundable': 'Loan cannot be funded',
      'LoanPositionManager__TransferFailed': 'Transfer failed',
      'LoanPositionManager__LoanFundingFailed': 'Loan funding failed',
      'LoanPositionManager__HealthFactorOk': 'Health factor check failed',
      'LoanPositionManager__LiquidationError': 'Liquidation process encountered an error',
      'LoanPositionManager__SenderNotOwner': 'Sender is not the owner',
      'LoanPositionManager__AddCollateralFailed': 'Failed to add collateral',
      'LoanPositionManager__RepayExpired': 'Repayment period has expired',
      'LoanPositionManager__RequestExpired': 'Loan request period has expired',
    };
  
    const errorMessage = Object.keys(errorMap).find((key) => error.includes(key));
    if (errorMessage) {
      toast.error(errorMap[errorMessage]);
    } else {
      toast.error('An unexpected error occurred');
    }
  }  

  handleSuccess(message: string) {
    toast.success(message || "Success");
  }

  info(message: string) {
    toast(message || "Success");
  }
}

export default MessageHandler;