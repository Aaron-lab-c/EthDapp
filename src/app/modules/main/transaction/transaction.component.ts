import { Component, OnInit } from '@angular/core';
import { mergeMap, take } from 'rxjs';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { TransactionParameter } from 'src/app/types';
import { TransactionModel } from 'src/app/model/TransactionModel';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  public transactionModel!:TransactionModel;
  public result!:boolean;
  constructor(private provider : ProviderService){
    this.transactionModel = new TransactionModel('','','');
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

  ngOnInit() {

  }

  public transaction() {
    this.provider.getAccount().pipe(
      take(1),
      mergeMap( (accounts) => {
          this.provider.defaultAccount = accounts[0];
          const params = {
              from: this.provider.defaultAccount,
              to: this.transactionModel.to,
              value: this.transactionModel.value
          } as TransactionParameter;
          return this.provider.sendTransaction(params);
      })
    ).subscribe(x => {console.log(x.status);this.result=x.status;});
  }
}
