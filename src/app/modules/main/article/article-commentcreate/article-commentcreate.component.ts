import { Component, Input, OnInit } from '@angular/core';
import { ArticleModel, commentModel } from 'src/app/model/ArticleModel';
import { ContractProviderService } from 'src/app/services/ContractProvider/contract-provider.service';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
  selector: 'app-article-commentcreate',
  templateUrl: './article-commentcreate.component.html',
  styleUrls: ['./article-commentcreate.component.css']
})
export class ArticleCommentcreateComponent implements OnInit {
  public abi_article = this.contractProvider.abi_article_provider;
  public address_article = this.contractProvider.address_article_provider;

  //用來裝合約instance
  public contract_article!:any;

  @Input()
  public ArticleId!:number;

  public commentmodel!:commentModel;
  public result!:boolean;

  constructor(private provider : ProviderService,private contractProvider:ContractProviderService) {
    this.commentmodel = new commentModel('','');

    //產生管理權限合約的instance
    this.contract_article = new this.provider.web3.eth.Contract(
      this.abi_article,this.address_article,{
        from: this.provider.defaultAccount,
        gasPrice: '20000000000'
      });
    }  
  ngOnInit(): void {
  }

  public async PostComment(): Promise<boolean> {
    try {
      await this.contract_article.methods
        .postComment(
          this.ArticleId,
          this.commentmodel.content
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