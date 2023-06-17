import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { AuctionModel } from 'src/app/model/AuctionModel';




@Component({
  selector: 'app-auction-create',
  templateUrl: './auction-create.component.html',
  styleUrls: ['./auction-create.component.css']
})
export class AuctionCreateComponent {
  public abi_auction = this.provider.abi_auction_provider;
  public address_auction = this.provider.address_auction_provider;

//用來裝合約instance
public contract_auction!:any;
public  auctionmodel!:AuctionModel;
public result?:boolean;
public acc:string=this.provider.defaultAccount;
constructor(private provider : ProviderService){
  this.auctionmodel = new AuctionModel("","",0,"",0);
  //產生拍賣合約的instance
  this.contract_auction = new this.provider.web3.eth.Contract(
    this.abi_auction,this.address_auction,{
      from: this.provider.defaultAccount,
      gasPrice: '20000000000'
    });
    /*
    this.getProduct()
    .then((result: AuctionModel) => {
      console.log("ss"+result.product_name); // 取得解析後的資料
    })
    .catch((error: any) => {
      console.error("ee"+error); // 處理錯誤
    });*/
}

ngOnInit(): void {
}
async getProduct(): Promise<AuctionModel>{
  let auction!:AuctionModel;

  auction = await this.contract_auction.methods.mapproduct("0xae441a3175cbf45ba18fed634516154ec3ad0c66",0).call(
    {
      from: this.provider.defaultAccount,
    }).then((result: any) => {
      console.log(result);
    })
    .catch((error: any) => {
      console.error(error);
      return auction;
    });
    return auction;
}
  public async PostProduct(): Promise<boolean> {
    try {
      await this.contract_auction.methods
        .Post(
          this.auctionmodel.product_name,
          this.auctionmodel.product_introduce,
          this.auctionmodel.product_price
        )
        .send({
          from: this.provider.address[0],
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
}
