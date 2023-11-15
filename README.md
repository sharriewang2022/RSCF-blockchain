# Cloud-based Blockchain and DRM for Traceability and Security in Retail Supply Chain Finance

## 1. Introduction

In recent years, financial information traceability and security for all stakeholders in the supply chain have emerged as the main issues that have to be resolved in the development of traditional retail supply chain finance. This application developed a RSCF platform that creatively combines cloud-based blockchain with DRM technologies, which have the characteristics of information sharing, data traceability, and tamper resistance.

## 2. Architecture

This system uses smart contracts to track product information. Solidity is being used to write the smart contract, which is subsequently compiled, migrated, and deployed on the private blockchain network Ganache in the Truffle framework. The frontend is created using the React.js framework, and it leverages Web3.js to interface with the local blockchain network and smart contract. The Flask framework is used by the backend to manage MySQL database data and offer RESTful APIs. For double protection, this application encrypts data using DRM before uploading it to IPFS.  
 
## 3. Installation and Setup
   
Before getting started, it is necessary to make sure all the prerequisites for development environment configuration are met in the following table.
<br> (1)	Visual Studio Code	--1.84.0
<br> (2) Node.js	--18.15.0
<br> (3) DatabaseMySQL	--8.1.0
<br> (4) Window10	
<br> (5) React.js	--18.2.0
<br> (6) Typescript	--4.9.5
<br> (7) Web3.js	--4.1.2
<br> (8) Python	3.11
<br> (9) Solidity	0.8.19
<br> (10) Ganache	2.7.1
<br> (11) Truffle	2.1.15
<br> (12) Metamask	
<br> (13) IPFS	

## 4. Quick Start

### (1) Setting up Smart Contract:

git clone https://github.com/sharriewang2022/RSCF-blockchain/tree/master/trufflerscf.git

Go to the above project folder in terminal then execute :

compile the smart contract:
<br> truffle compile

Migrating the smart contract to ganach needs to change truffle.js port settings the Ganache server listing on port : 7545. 
migrate the smart contract:
<br> truffle migrate development

deploy the smart contract:
<br> truffle deploy –reset 
  
Test on ganache:
<br> truffle test
 
### (2) Start BackEnd DApp 

git clone https://github.com/sharriewang2022/RSCF-blockchain/tree/master/FlaskEndRSCF.git

Open the second terminal and enter the above folder.
<br> Install dependencies in terminal and execute:
<br> npm i
Run the backend service:
<br> flask run

### (3) Start FrontEnd DApp 

git clone https://github.com/sharriewang2022/RSCF-blockchain/tree/master/frontendrscf.git

Open the thrid terminal and enter the above folder.
Install dependencies:
<br> npm i

Install ganache-cli:
<br> npm i -g ganache-cli

Set up gasLimit to 6721975000 and above, then configure ganache-cli for 10 accounts. This will ensure that there is sufficient gas for the smart contract migration and data flow for the prototype.
<br> ganache-cli --accounts 10 --gasLimit 6721975000

Install all packages in the package.json file:
<br> npm i

Run the application:
<br> npm start

By default, the application is hosted on port 3000.

## 5. License
The Truffle project uses an MIT license for Smart Contract.

## 6. Documentation of Tools
(1) Documentation to help with Solidity
https://docs.soliditylang.org/en/v0.8.4/
(2) Documentation to help with React
https://reactjs.org/docs/getting-started.html
(3) Documentation to help with Truffle
https://www.trufflesuite.com/docs/truffle/reference/configuration
(4) Documentation to help with Ganache-cli
https://www.trufflesuite.com/docs/ganache/overview
(5) Documentation to help Creating diagrams
https://www.draw.io/








