import Web3 from "web3";

const web3 = new Web3(window.ethereum);

//find out the ethereum amount of the account logged in
export const getBalance = async (account: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        // older versions used callbacks.
        // web3.eth.getBalance(account, (mistake: any, data: any) => {
        //     if (mistake) {
        //         reject(mistake);
        //     } else {
        //         resolve(web3.utils.fromWei(data, "ether"));
        //     }
        // });

        //a promise based interface
        web3.eth.getBalance(account).then((result) => {
            resolve(web3.utils.fromWei(result, "ether"));
        }).catch(error => {
            reject(error);
        }) ;
    });
};

//When the web3 wallet is compatible with a browser,   send ethereum using the'sendTransaction' function.
export const sendEthereum = async (
    sender: string,
    receiver: string,
    amount: string,
) => {
    try {
        const params = {
            from: sender,
            to: receiver,
            value: web3.utils.toHex(web3.utils.toWei(amount, "ether")),
            gas: 39000,
        };
        await window.ethereum.enable();
        return await web3.eth.sendTransaction(params);
    } catch (error) {
        new Error("Something went wrong!");
    }
};