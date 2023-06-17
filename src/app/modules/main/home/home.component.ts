import { Component, OnInit } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { ProviderService } from 'src/app/services/provider/provider.service';
const abi_roleaccess=[ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "", "type": "address" } ], "name": "Deploy", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" } ], "name": "GrantRole", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" } ], "name": "RevokeRole", "type": "event" }, { "stateMutability": "payable", "type": "fallback", "payable": true }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "articles", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "address", "name": "", "type": "address" } ], "name": "roles", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function", "constant": true }, { "stateMutability": "payable", "type": "receive", "payable": true }, { "inputs": [ { "internalType": "address", "name": "_addr", "type": "address" } ], "name": "getArticlesNum", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "address", "name": "_addr", "type": "address" }, { "internalType": "uint256", "name": "_index", "type": "uint256" } ], "name": "getArticleAddress", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "address", "name": "_addr", "type": "address" }, { "internalType": "address", "name": "_Article", "type": "address" } ], "name": "PostArticle", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "_role", "type": "bytes32" }, { "internalType": "address", "name": "_account", "type": "address" } ], "name": "external_grantRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "_role", "type": "bytes32" }, { "internalType": "address", "name": "_account", "type": "address" } ], "name": "external_revokeRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_title", "type": "string" }, { "internalType": "string", "name": "_content", "type": "string" } ], "name": "Articles2getBytecode", "outputs": [ { "internalType": "bytes", "name": "", "type": "bytes" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "bytes", "name": "_code", "type": "bytes" } ], "name": "deploy", "outputs": [ { "internalType": "address", "name": "addr", "type": "address" } ], "stateMutability": "payable", "type": "function", "payable": true }, { "inputs": [ { "internalType": "address", "name": "addr", "type": "address" }, { "internalType": "bytes", "name": "data", "type": "bytes" } ], "name": "execute", "outputs": [], "stateMutability": "payable", "type": "function", "payable": true }, { "inputs": [ { "internalType": "string", "name": "func", "type": "string" }, { "internalType": "address", "name": "addr", "type": "address" } ], "name": "getCalldata", "outputs": [ { "internalType": "bytes", "name": "", "type": "bytes" } ], "stateMutability": "pure", "type": "function", "constant": true } ];

const address_roleaccess= '0xA35A1762F22Bec4d1161dB9E16B0886C338F686E';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public ob!: Observable<any>;
  public contract_roleaccess!:any;
  public thisaddress:string="sss";


  constructor(private provider : ProviderService){
    this.contract_roleaccess = new this.provider.web3.eth.Contract(
      abi_roleaccess,address_roleaccess,{
        from: this.provider.defaultAccount,
        gasPrice: '20000000000'
      });
      console.log("HomeComponent");
      this.thisaddress = this.provider.defaultAccount;

//'0xAe441A3175Cbf45Ba18fEd634516154eC3Ad0c66'


      //this.ob.subscribe(x => {console.log(x)});
    }

    ngOnInit(): void {
    }


    async execute() {
      const finalNumber = await lastValueFrom(this.ob);
      console.log(`The final is ${ finalNumber }`);
      console.log("wwww");
    }
  



  
  
/*
  public getCurrentAddress(): void{
    let ob$=this.provider.getCurrentAddress();
    ob$.subscribe(
      {
        next: (res) => { this.WalletAddress = res; },
        error: (err) => { console.error(err) },
        complete: () => {console.log("complete")}
      }
    )
    console.log("call currentAddress!");
  }*/
  
}
