import { Component, Input, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { AuctionModel } from 'src/app/model/AuctionModel';
import { ContractProviderService } from 'src/app/services/ContractProvider/contract-provider.service';



@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css']
})
export class AuctionDetailComponent implements OnInit {
  ngOnInit(): void {
  }
  public abi_auction = this.contractProvider.abi_auction_provider;
  public address_auction = this.contractProvider.address_auction_provider;

  @Input()
  public auctionmodel!: AuctionModel;
  @Input()
  public num!: number;

  //用來裝合約instance
  public contract_auction!:any;
  public result?:boolean;
  constructor(private provider : ProviderService,private contractProvider:ContractProviderService){
    //產生拍賣合約的instance
    this.contract_auction = new this.provider.web3.eth.Contract(
      this.abi_auction,this.address_auction,{
        from: this.provider.defaultAccount,
        gasPrice: '20000000000'
      });

  }




  async Buy(): Promise<boolean>{
    try {
      await this.contract_auction.methods
        .Buy(this.auctionmodel.index)
        .send({
          from: this.provider.address[0],
          gas: 1000000, // 設定適當的 gas 限制
          value: this.auctionmodel.product_price //單位是wei
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
