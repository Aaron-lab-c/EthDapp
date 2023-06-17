import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { ArticleModel } from 'src/app/model/ArticleModel'
import { Observable, lastValueFrom, observable } from 'rxjs';
import { ContractProviderService } from 'src/app/services/ContractProvider/contract-provider.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {

  public abi_article = this.contractProvider.abi_article_provider;
  public address_article = this.contractProvider.address_article_provider;

  //用來裝合約instance
  public contract_article!:any;



  public articlemodel!:ArticleModel;
  public result!:boolean;

  constructor(private provider : ProviderService,private contractProvider:ContractProviderService) {
    this.articlemodel = new ArticleModel('','','',0);

    //產生管理權限合約的instance
    this.contract_article = new this.provider.web3.eth.Contract(
      this.abi_article,this.address_article,{
        from: this.provider.defaultAccount,
        gasPrice: '20000000000'
      });
    }

  ngOnInit(): void {}

  public async PostArticle(): Promise<boolean> {
    try {
      await this.contract_article.methods
        .publishArticle(
          this.articlemodel.title,
          this.articlemodel.content
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
