import React, { createContext, useContext, useEffect, useState } from 'react';
import Web3 from "web3";
// import { ethers } from 'ethers';
import SupplyChainRSCF from '../abis/SupplyChainRSCF.json'
import web3Load from "../trace/metamask/web3Load"
import { Web3Provider } from '@ethersproject/providers';
import { SMART_CONTRACT_ADDRESS } from '../config/sysConfig';

interface Props {
  children: JSX.Element
}

interface BlockContextData {
  addProduct: (name:string) => any;
  account: any;
  productCount:() => any;
  updateLocation:(location: string, id: string, address: string) => {};
  trackProduct:(id:string) => any;
  fetchOwner:(id:string) => any;
  fetchLocations:(id:string) => any;
}

export const blockContext = createContext({} as BlockContextData)

export function useBlock(){
  return useContext(blockContext)
}

export function BlockProvider({children}: Props){
    const [account , setAccount] = useState("");
    const [supplyChainABI ,setSupplyChainABI] = useState<any>();
    // const [smartContract ,setSmartContract] = useState<any>();
    const [isMetamask, setIsMetamask] = useState(false);
    const [web3,setWeb3] = useState<any>();
 
    useEffect(() => {
      web3Load()
      if(window.ethereum){
          loadBlockChainData()
          window.ethereum.on('accountsChanged', function (accounts:any) {
          setAccount(accounts[0])
      })
      return window.ethereum.off
    }
    },[])
  
  // re-register MetaMask provider whenever network changes
  useEffect(() => {
    loadWeb3()
    if(window.ethereum){
      window.ethereum.on("accountsChanged", (accounts: any) => {
        const provider = new Web3Provider(window.ethereum);
        // const provider = new ethers.providers.get(window.ethereum);
        // window.web3.setProvider(provider)
        console.log(accounts[0]);
      });
      window.ethereum.on('chainChanged', () => {
        // handle what happens when chain changes, prefereably reload the page
        const provider = new Web3Provider(window.ethereum);
        // error:window.web3.setProvider is not a function
        // window.web3.setProvider(provider)
        window.location.reload(); 
      });
    
      window.ethereum.request({ method: "eth_requestAccounts" })
      .then( (accounts: any) => 
        {
          console.log(accounts[0]);
        }
      )
    }
  }, []);

    async function loadWeb3() {
        if (window.ethereum) {
          setIsMetamask(true)
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          setIsMetamask(true)
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {          
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');          
        }
      }

      //react connect blockchain contract
      //1.Load web3 after has a wallet; 
      //2.(Optional) put web3 object and the accounts from web3.eth.getAccounts() to setState
      //3.Create contract instance with the address from deployment.  can deploy the contract dynamically from the app but more complicated.
      //4.Add the contract to your state
      //Call methods on the contract
      async function loadBlockChainData(){
        window.ethereum.enable();  
        const web3 = new Web3(window.web3.currentProvider);
        // const web3 = new Web3(window.ethereum);
        // const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
        const accounts = await web3.eth.getAccounts()
        setWeb3(web3)
        // Get the accounts from MetaMask      
        // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        web3.eth.defaultAccount = accounts[0];
        console.log(accounts[0]);
        // Get the network ID
        const currentNetworkId = parseInt(await window.ethereum.request({ method: 'net_version' }));
        console.log(currentNetworkId)
        // Get the network data from the contract JSON
        const networkId = await web3.eth.net.getId();
        const chainId = await web3.eth.getChainId();

        const contractABI = SupplyChainRSCF.abi;
        const contractAddress = SMART_CONTRACT_ADDRESS;
        // const contractAddress = supplyJson.networks["5777"].address;
        // const contractAddress = supplyJson.networks[networkId].address; //supplyJson.networks[42]        

        //get smart contract in supplyChain.json. parameters: (contractABI, contractAddress）
        const productContractAbi = new web3.eth.Contract(contractABI, contractAddress);
        setSupplyChainABI(productContractAbi)
        console.log(productContractAbi)    

        // call the  `name` method. which is a view method.
        // let result = await productContractAbi.methods.
        // console.info("contract name result: ", result);           
      }

      // async function loadBlockChainData(){
      //   const web3 = window.web3
      //   setWeb3(web3)
      //   const accounts = await web3.eth.getAccounts()
      //   setAccount(accounts[0])
      //   const networkId = await web3.eth.net.getId()
      //   console.log(networkId)
      //   const supplyAbi = new web3.eth.Contract(supply)
      //   const networkData = supplyAbi.networks[networkId]
      //   const chainABI =   new web3.eth.Contract(supply.abi,networkData.address,{ transactionConfirmationBlocks: 1,gasPrice :200000000000})
      //   setSupplyChainABI(chainABI)
      //   console.log(chainABI)    
      
      // if (currentNetworkId !== chainId) {
      //   try {
      //     await window.ethereum.request({
      //       method: 'wallet_switchEthereumChain',
      //       params: [{ chainId: `0x${addresses.chainId.toString(16)}` }],
      //     });
      //   } catch (error:any) {
      //     console.error('Error switching network:', error);
      //     if (error.code === 4902) {
      //       console.error(`Please add the mumbai network to your MetaMask wallet`, {
      //         type: 'error',
      //       });
      //     } else {
      //       console.error('User rejected the request.');
      //     }
      //   }
      // }
      // this.contract = this.contract.connect(this.signer);  
      // }

      function addProduct(name:string){
        if(supplyChainABI == undefined){
          return;
        }
        console.info("contract addProduct result: ", supplyChainABI);     
        // call smart contract method.  
        return supplyChainABI.methods.addProduct(name).send({from : account})
      }

      function updateLocation(location: string, id: string, address: string){
        return supplyChainABI.methods.changeLocation(location,id,address).send({from : account})
      } 

      function trackProduct(id:string){
        return supplyChainABI.methods.fetchInfo(id).call()
      }
      function productCount(){
        return supplyChainABI.methods.productCount().call()
      }

      function fetchOwner(id:string){
        return supplyChainABI.methods.fetchAddress(id).call()
      }

      function fetchLocations(id:string){
        return supplyChainABI.methods.fetchAllLocation(id).call()
      }
      const value = {
        addProduct,
        account,
        productCount,
        updateLocation,
        trackProduct,
        fetchOwner,
        fetchLocations
      }
      return(
          <blockContext.Provider value = {value}>
            {children}
          </blockContext.Provider>
      ) 
}
