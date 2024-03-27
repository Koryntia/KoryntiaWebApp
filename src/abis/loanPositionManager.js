const LoanPositionManagerAbi = [
  {
    "inputs": [],
    "name": "LoanPositionManager__AddCollateralFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LoanPositionManager__HealthFactorOk",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LoanPositionManager__LiquidationError",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LoanPositionManager__LoanFundingFailed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LoanPositionManager__LoanNotFundable",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LoanPositionManager__LoanParams_Applicant",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LoanPositionManager__LoanParams_CollateralAmount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LoanPositionManager__LoanParams_InitialThreshold",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LoanPositionManager__LoanParams_InterestRate",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LoanPositionManager__LoanParams_LiquidationThreshold",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LoanPositionManager__LoanParams_LoanAmount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LoanPositionManager__LoanParams_RepayDeadline",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LoanPositionManager__LoanParams_RequestDeadline",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LoanPositionManager__Loan_AlreadyInitialized",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LoanPositionManager__RepayExpired",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LoanPositionManager__RequestExpired",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LoanPositionManager__SenderNotOwner",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LoanPositionManager__TokenNotAvailable",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "LoanPositionManager__TransferFailed",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "loanId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "CollateralAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "version",
        "type": "uint8"
      }
    ],
    "name": "Initialized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "loanId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "loanAmount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "debtAmount",
        "type": "uint256"
      }
    ],
    "name": "LoanFunded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "loanId",
        "type": "uint256"
      }
    ],
    "name": "LoanLiquidation",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "loanId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "collateralAmount",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "initialThreshold",
        "type": "uint256"
      }
    ],
    "name": "LoanPositionCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "loanId",
        "type": "uint256"
      }
    ],
    "name": "LoanRepaid",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "loanId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "addCollateral",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "collateralToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "collateralAmount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "loanToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "initialThreshold",
        "type": "uint256"
      }
    ],
    "name": "calculateDebtAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "debtAmount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "interestRate",
        "type": "uint32"
      }
    ],
    "name": "calculateMaxAllowedLiquidationThreshold",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "loanToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "collateralToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "collateralAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint32",
        "name": "liquidationThreshold",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "initialThreshold",
        "type": "uint32"
      },
      {
        "internalType": "uint64",
        "name": "loanRepayDeadline",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "loanRequestDeadline",
        "type": "uint64"
      },
      {
        "internalType": "uint32",
        "name": "interestRate",
        "type": "uint32"
      }
    ],
    "name": "createLoanPosition",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "loanId",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "loanId",
        "type": "uint256"
      }
    ],
    "name": "fundLoan",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "loanAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "debtAmount",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "loanId",
        "type": "uint256"
      }
    ],
    "name": "healthFactor",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "oracleAdress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "nftAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "treasuryAddress",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "loanId",
        "type": "uint256"
      }
    ],
    "name": "liquidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "loanId",
        "type": "uint256"
      }
    ],
    "name": "repay",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "loanId",
        "type": "uint256"
      }
    ],
    "name": "withdrawCollateral",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export default LoanPositionManagerAbi