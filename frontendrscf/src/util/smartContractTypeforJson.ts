export type supplyChainAbiType = readonly [{
     "anonymous": false,
     "inputs": [
       {
         "indexed": false,
         "internalType": "string",
         "name": "info",
         "type": "string"
       }
     ],
     "name": "Info",
     "type": "event"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": false,
         "internalType": "uint256",
         "name": "id",
         "type": "uint256"
       },
       {
         "indexed": false,
         "internalType": "address",
         "name": "owner",
         "type": "address"
       },
       {
         "indexed": false,
         "internalType": "string",
         "name": "name",
         "type": "string"
       },
       {
         "indexed": false,
         "internalType": "uint256",
         "name": "currentLocation",
         "type": "uint256"
       },
       {
         "indexed": false,
         "internalType": "uint256",
         "name": "date",
         "type": "uint256"
       }
     ],
     "name": "ProductAdded",
     "type": "event"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": false,
         "internalType": "uint256",
         "name": "id",
         "type": "uint256"
       },
       {
         "indexed": false,
         "internalType": "string",
         "name": "currentLocation",
         "type": "string"
       }
     ],
     "name": "locationChanged",
     "type": "event"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "name": "ProductMap",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "id",
         "type": "uint256"
       },
       {
         "internalType": "address",
         "name": "owner",
         "type": "address"
       },
       {
         "internalType": "string",
         "name": "name",
         "type": "string"
       },
       {
         "internalType": "uint256",
         "name": "currentLocation",
         "type": "uint256"
       },
       {
         "internalType": "uint256",
         "name": "date",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "name": "Products",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "id",
         "type": "uint256"
       },
       {
         "internalType": "address",
         "name": "owner",
         "type": "address"
       },
       {
         "internalType": "string",
         "name": "name",
         "type": "string"
       },
       {
         "internalType": "uint256",
         "name": "currentLocation",
         "type": "uint256"
       },
       {
         "internalType": "uint256",
         "name": "date",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "name": "productAdded",
     "outputs": [
       {
         "internalType": "bool",
         "name": "",
         "type": "bool"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "productCount",
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
         "internalType": "string",
         "name": "_name",
         "type": "string"
       }
     ],
     "name": "addProduct",
     "outputs": [
       {
         "internalType": "bool",
         "name": "",
         "type": "bool"
       }
     ],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "string",
         "name": "_location",
         "type": "string"
       },
       {
         "internalType": "uint256",
         "name": "_id",
         "type": "uint256"
       },
       {
         "internalType": "address",
         "name": "_new_owner",
         "type": "address"
       }
     ],
     "name": "changeLocation",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "_id",
         "type": "uint256"
       }
     ],
     "name": "fetchInfo",
     "outputs": [
       {
         "internalType": "string",
         "name": "",
         "type": "string"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "_id",
         "type": "uint256"
       }
     ],
     "name": "fetchAddress",
     "outputs": [
       {
         "internalType": "address",
         "name": "",
         "type": "address"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "_id",
         "type": "uint256"
       }
     ],
     "name": "fetchAllLocation",
     "outputs": [
       {
         "internalType": "string[15]",
         "name": "",
         "type": "string[15]"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   }


];