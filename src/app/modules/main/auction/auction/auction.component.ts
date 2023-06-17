import { Component, Input, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { AuctionModel } from 'src/app/model/AuctionModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  auctions!: AuctionModel[];
  selectedauction?: AuctionModel;
  public abi_auction = this.provider.abi_auction_provider;
  public address_auction = this.provider.address_auction_provider;

  getwww(): void{
    console.log(this.auctions);
  }
  
  www: AuctionModel[] = [new AuctionModel("apple","apple",1000,"apple",0),new AuctionModel("mango","mango",1000,"mango",1),new AuctionModel("orange","orange",1000,"orange",2)];
  async getAuctions(): Promise<void> {
    await this.contract_auction.methods.Get_array_product().call(
      {
        from: "0xae441a3175cbf45ba18fed634516154ec3ad0c66",
      }).then((result: any) => {
        // 在此處處理方法調用的結果
        console.log("test:"+result);
        this.auctions = result;
      })
      .catch((error: any) => {
        // 在此處處理錯誤
        console.error(error);
      });
/*
     new Observable( observeable => {
      this.contract_auction.methods.Get_array_product().call(
        {
          from: this.provider.defaultAccount,
        }).then((result: any) => {
          // 在此處處理方法調用的結果
          console.log(result);
          observeable.next(result);
          this.auctions = result;
          observeable.complete();
        })
        .catch((error: any) => {
          // 在此處處理錯誤
          console.error(error);
        });
      });*/

  }

  onSelect(Auction: AuctionModel): void {
    this.selectedauction = Auction;
  }
  //用來裝合約instance
  public contract_auction!:any;
  public  auctionmodel!:AuctionModel;
  public result?:boolean;
  constructor(private provider : ProviderService){
    this.auctionmodel = new AuctionModel("","",0,"",0);
    //產生拍賣合約的instance
    this.contract_auction = new this.provider.web3.eth.Contract(
      this.abi_auction,this.address_auction,{
        from: this.provider.defaultAccount,
        gasPrice: '20000000000'
      });
      this.getAuctions();
      console.log(this.auctions);
      console.log(this.www);
  }
  
  ngOnInit(): void {
  }
 


  async Buy(): Promise<void>{
    let auction!:AuctionModel;
    auction = await this.contract_auction.methods.Buy(this.auctionmodel.index).call(
      {
        from: this.provider.defaultAccount,
      }).then((result: any) => {
        this.auctionmodel = result;
        console.log(result);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
  /*
  public async PostProduct(): Promise<boolean> {
    let a = this.provider.defaultAccount;
    try {
      await this.contract_auction.methods
        .Post(
          this.auctionmodel.product_name,
          this.auctionmodel.product_introduce,
          this.auctionmodel.product_price
        )
        .send({
          from: '0xae441a3175cbf45ba18fed634516154ec3ad0c66',
          gas: 4000000 // 設定適當的 gas 限制
        }).then((result: any) => {
          console.log(result);
        });
  
      this.result = true;
      return true;
    } catch (error) {
      console.error(error);
      this.result = false;
      return false;
    }

  }
  */

  
}
