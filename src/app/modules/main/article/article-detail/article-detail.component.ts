import { Component, Input, OnInit,ChangeDetectorRef  } from '@angular/core';
import { ArticleModel, commentModel } from 'src/app/model/ArticleModel';
import { ContractProviderService } from 'src/app/services/ContractProvider/contract-provider.service';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  public abi_article = this.contractProvider.abi_article_provider;
  public address_article = this.contractProvider.address_article_provider;

  //用來裝合約instance
  public contract_article!:any;
  public comments!:any[];

  @Input()
  public comment!:any;
  @Input()
  public articlemodel!:ArticleModel;
  @Input()
  public num!:any;

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
  ngOnInit(): void {
  }

  public async getComments(): Promise<void> {
    await this.contract_article.methods.comments(this.articlemodel.ArticleId).call(
      {
        from: this.provider.defaultAccount
      }).then((result: any) => {
        this.comments = result;
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}
