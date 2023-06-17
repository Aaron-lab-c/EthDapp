import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ArticleModel, commentModel } from 'src/app/model/ArticleModel';
import { ContractProviderService } from 'src/app/services/ContractProvider/contract-provider.service';
import { ProviderService } from 'src/app/services/provider/provider.service';
import Web3 from 'web3';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  public abi_article = this.contractProvider.abi_article_provider;
  public address_article = this.contractProvider.address_article_provider;

  //用來裝合約instance
  public contract_article!:any;

  public article_index!:number[];
  public articles:ArticleModel[]=[];

  public comments:commentModel[]=[];

  public articlemodel!:ArticleModel;
  public result!:boolean;
  constructor(private provider : ProviderService,private cdr: ChangeDetectorRef,private contractProvider:ContractProviderService){

      this.contract_article = new this.provider.web3.eth.Contract(
        this.abi_article,this.address_article,{
          from: this.provider.defaultAccount,
          gasPrice: '20000000000'
        });
  }

  ngOnInit(): void {
    this.run();
  }

  public async getArticle(_index:number): Promise<void> {
    await this.contract_article.methods.articles(_index).call(
      {
        from: this.provider.defaultAccount
      }).then((result: any) => {
        let temp_article:ArticleModel = new ArticleModel('','','',0);
        temp_article.title = result.title;
        temp_article.content = result.content;
        temp_article.author = result.author;
        temp_article.ArticleId = _index;
        this.articles.push(temp_article);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  public async getArticle_index(): Promise<void> {
    await this.contract_article.methods.getArticle_index().call(
      {
        from: this.provider.defaultAccount
      }).then((result: any) => {
        this.article_index = result;
        console.log(result);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  async run(): Promise<void> {
    try {
      await this.getArticle_index(); // 等待 A 完成
      console.log("run1");
      for(let i = 0; i< this.article_index.length ; i++){
        await this.getArticle(this.article_index[i]); // A 完成後再執行 B
      }
      console.log("run2");
      for(let i = 0; i< this.article_index.length ; i++){
        await this.getComments(i,this.article_index[i]); // A 完成後再執行 B
      }

    }catch (error) {
      console.error(error);
      this.result = false;
    }
}
    
  public async getComments(i:number,_index:number): Promise<void> {
    await this.contract_article.methods.getAllComment(_index).call(
      {
        from: this.provider.defaultAccount
      }).then((result: any) => {
        if(result.length===0){

        }else{
          this.articles[i].comments = result;
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

}
