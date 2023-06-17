import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Observable, from, of, take } from 'rxjs';
import { TransactionParameter } from 'src/app/types';


//const TruffleContract = require("@truffle/contract");
declare let window: any;
declare let require: any;
const abi_auction = [ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "stateMutability": "payable", "type": "fallback", "payable": true }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "array_product", "outputs": [ { "internalType": "string", "name": "product_name", "type": "string" }, { "internalType": "string", "name": "product_introduce", "type": "string" }, { "internalType": "uint256", "name": "product_price", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "mapproduct", "outputs": [ { "internalType": "string", "name": "product_name", "type": "string" }, { "internalType": "string", "name": "product_introduce", "type": "string" }, { "internalType": "uint256", "name": "product_price", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "stateMutability": "payable", "type": "receive", "payable": true }, { "inputs": [ { "internalType": "uint256", "name": "_index", "type": "uint256" } ], "name": "GetProduct", "outputs": [ { "components": [ { "internalType": "string", "name": "product_name", "type": "string" }, { "internalType": "string", "name": "product_introduce", "type": "string" }, { "internalType": "uint256", "name": "product_price", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" } ], "internalType": "struct Auction.Product", "name": "", "type": "tuple" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "Get_array_product", "outputs": [ { "components": [ { "internalType": "string", "name": "product_name", "type": "string" }, { "internalType": "string", "name": "product_introduce", "type": "string" }, { "internalType": "uint256", "name": "product_price", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" } ], "internalType": "struct Auction.Product[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_introduce", "type": "string" }, { "internalType": "uint256", "name": "_price", "type": "uint256" } ], "name": "Post", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_index", "type": "uint256" } ], "name": "Buy", "outputs": [], "stateMutability": "payable", "type": "function", "payable": true }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "payable", "type": "function", "payable": true } ];
const address_auction = '0xDD78DA2181223741994033bd933A92d259dB3c85';

const abi_profile = [ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "mapProfiles", "outputs": [ { "internalType": "string", "name": "username", "type": "string" }, { "internalType": "string", "name": "introduce", "type": "string" }, { "internalType": "address", "name": "useraddress", "type": "address" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "string", "name": "_Username", "type": "string" } ], "name": "setUsername", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_Introduce", "type": "string" } ], "name": "setIntroduce", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "setUseraddress", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" } ];
const address_profile = '0x8b144E63ff73Bf7A0C548D5DA4E338b113a85136';

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
};


@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  private accountList: Array<string> = [];
  public web3: any;
  public address!:string;
  public abi_auction_provider = abi_auction;
  public address_auction_provider = address_auction;
  public abi_profile_provider = abi_profile;
  public address_profile_provider = address_profile;
  constructor() {
    this.web3 = typeof window.web3 !== 'undefined'
    ? new Web3(window.web3.currentProvider)
    : new Web3(new Web3.providers.WebsocketProvider('http://localhost:7545'));
    this.address = this.web3.eth.getAccounts()[0];
    console.log(this.address+"wtreg");
  }
  /*�s�����]*/
  public ConnectWallet(): Observable<string>{
        this.web3 = typeof window.web3 !== 'undefined'
    ? new Web3(window.web3.currentProvider)
    : new Web3(new Web3.providers.WebsocketProvider('http://localhost:7545'));
    return new Observable<string>(observer => {
      this.enableConnect().pipe(take(1)).subscribe(
        {
          next: (res: string) => {console.log("enableConnect():"+res);this.address=res;observer.next(res);},
          error: (err: any) => { console.error(err);observer.error(err);},
          complete: () => { console.log("complete1");observer.complete();}
        });
    });
  }
  public enableConnect(): Observable<any> {
    return from(this.web3.currentProvider.enable());
  }

  public getCurrentAddress(): Observable<string> {
    let currentAddress!:string;

    if (typeof window.ethereum !== 'undefined') {
      console.error('not connect!');
    }
     else {
      const accounts =  this.web3.eth.getAccounts();
      currentAddress = accounts[0].toString();
    }
    return of(currentAddress);
  }
  


  public getAccount(): Observable<any> {
    return from(this.web3.eth.getAccounts());
  }

  public set defaultAccount(account: string) {
    this.web3.eth.defaultAccount = account;
  }

  public get defaultAccount(): string {
      return this.web3.eth.defaultAccount;
  }

  public getBlock(index: number): Observable<any> {
      return from(this.web3.eth.getBlock(index));
  }

  public getCurrentBlockNumber(): Observable<any> {
      return from(this.web3.eth.getBlockNumber());
  }
  public getTransaction(txHash: string): Observable<any> {
      return from(this.web3.eth.getTransaction(txHash));
  }
  public getReceipt(txHash: string): Observable<any> {
      return from(this.web3.eth.getTransactionReceipt(txHash));
  }
  public sendTransaction(params: TransactionParameter): Observable<any> {
    return from(this.web3.eth.sendTransaction(params));
}
  
}
