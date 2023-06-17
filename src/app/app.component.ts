import { Component } from '@angular/core';
import { ProviderService } from './services/provider/provider.service';
import { Observable, mergeMap, take } from 'rxjs';
import { TransactionParameter } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public WalletAddress: string ="";
  Status:string = "狀態：尚未連接錢包";
  title = 'ethDapp';
    constructor(private provider: ProviderService) {
      this.ConnectWallet();
      this.provider.getAccount().pipe(take(1)).subscribe(accounts => {
        console.log("home:"+accounts);

        const currentAddress = this.provider.web3.eth.coinbase;
        console.log("currentAddress"+currentAddress);
      });
      /*
      this.provider.getCurrentAddress().subscribe(account => {
          console.log("wswsw:"+account);
      });
      */

    /*交易 */
    /*  
    this.provider.getAccount().pipe(
      take(1),
      mergeMap(accounts => {
          this.provider.defaultAccount = accounts[0];
          const params = {
              from: this.provider.defaultAccount,
              to: '0x992a4DeD62712E83cD0230705a6186Dd54cA3de6',
              value: '1000000000000000000'
          } as TransactionParameter;
          return this.provider.sendTransaction(params);
      }),
    ).subscribe(x => {console.log(x)});
    */
  }
    /*連接錢包(前端呼叫)*/
    public ConnectWallet(): void{
      this.provider.ConnectWallet().subscribe(
        {
          next: (res: string) => { this.WalletAddress = res; },
          error: (err) => { console.log("end Point:ERROR");console.error(err+"s") },
          complete: () => {console.log("complete2");this.Status="狀態：已連接錢包 | 目前地址：";} 
        }
      );
    }
}
