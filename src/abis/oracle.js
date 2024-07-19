const oracle = [
   {
      inputs: [],
      name: "StalePrice",
      type: "error",
   },
   {
      anonymous: false,
      inputs: [
         {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
         },
         {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
         },
      ],
      name: "OwnershipTransferred",
      type: "event",
   },
   {
      inputs: [
         {
            internalType: "address",
            name: "_tokenAddress",
            type: "address",
         },
         {
            internalType: "address",
            name: "_priceFeed",
            type: "address",
         },
      ],
      name: "addNewToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
   },
   {
      inputs: [
         {
            internalType: "address",
            name: "_tokenAddress",
            type: "address",
         },
      ],
      name: "getPrice",
      outputs: [
         {
            internalType: "uint80",
            name: "",
            type: "uint80",
         },
         {
            internalType: "int256",
            name: "",
            type: "int256",
         },
         {
            internalType: "uint256",
            name: "",
            type: "uint256",
         },
         {
            internalType: "uint256",
            name: "",
            type: "uint256",
         },
         {
            internalType: "uint80",
            name: "",
            type: "uint80",
         },
      ],
      stateMutability: "view",
      type: "function",
   },
   {
      inputs: [
         {
            internalType: "contract AggregatorV3Interface",
            name: "",
            type: "address",
         },
      ],
      name: "getTimeout",
      outputs: [
         {
            internalType: "uint256",
            name: "",
            type: "uint256",
         },
      ],
      stateMutability: "pure",
      type: "function",
   },
   {
      inputs: [
         {
            internalType: "address",
            name: "_tokenAddress",
            type: "address",
         },
      ],
      name: "isAllowedToken",
      outputs: [
         {
            internalType: "bool",
            name: "",
            type: "bool",
         },
      ],
      stateMutability: "view",
      type: "function",
   },
   {
      inputs: [],
      name: "owner",
      outputs: [
         {
            internalType: "address",
            name: "",
            type: "address",
         },
      ],
      stateMutability: "view",
      type: "function",
   },
   {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
   },
   {
      inputs: [
         {
            internalType: "address",
            name: "newOwner",
            type: "address",
         },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
   },
];

export default oracle;
