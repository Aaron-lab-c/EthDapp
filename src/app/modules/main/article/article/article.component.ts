import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ArticleModel, commentModel } from 'src/app/model/ArticleModel';
import { ProviderService } from 'src/app/services/provider/provider.service';
import Web3 from 'web3';
//合約abi
const abi_article=[ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "article_index", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "articles", "outputs": [ { "internalType": "address", "name": "author", "type": "address" }, { "internalType": "string", "name": "title", "type": "string" }, { "internalType": "string", "name": "content", "type": "string" }, { "internalType": "uint256", "name": "commentCount", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "comments", "outputs": [ { "internalType": "address", "name": "commenter", "type": "address" }, { "internalType": "string", "name": "content", "type": "string" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "lastest_article", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "string", "name": "_title", "type": "string" }, { "internalType": "string", "name": "_content", "type": "string" } ], "name": "publishArticle", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_articleId", "type": "uint256" }, { "internalType": "string", "name": "_content", "type": "string" } ], "name": "postComment", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_articleId", "type": "uint256" } ], "name": "getArticle", "outputs": [ { "components": [ { "internalType": "address", "name": "author", "type": "address" }, { "internalType": "string", "name": "title", "type": "string" }, { "internalType": "string", "name": "content", "type": "string" }, { "internalType": "uint256", "name": "commentCount", "type": "uint256" } ], "internalType": "struct Articles.Article", "name": "", "type": "tuple" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "getArticle_index", "outputs": [ { "internalType": "uint256[]", "name": "", "type": "uint256[]" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "uint256", "name": "_articleId", "type": "uint256" }, { "internalType": "uint256", "name": "_commentId", "type": "uint256" } ], "name": "getComment", "outputs": [ { "components": [ { "internalType": "address", "name": "commenter", "type": "address" }, { "internalType": "string", "name": "content", "type": "string" } ], "internalType": "struct Articles.Comment", "name": "", "type": "tuple" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "uint256", "name": "_articleId", "type": "uint256" } ], "name": "getAllComment", "outputs": [ { "components": [ { "internalType": "address", "name": "commenter", "type": "address" }, { "internalType": "string", "name": "content", "type": "string" } ], "internalType": "struct Articles.Comment[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function", "constant": true } ];
//權限管理合約地址
const address_article= '0x18cbD8371D8B12E19964e515fbbACF2e08D0728e';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  //用來裝合約instance
  public contract_article!:any;

  public article_index!:number[];
  public articles:ArticleModel[]=[];

  public comments:commentModel[]=[];

  public articlemodel!:ArticleModel;
  public result!:boolean;
  constructor(private provider : ProviderService,private cdr: ChangeDetectorRef){

      this.contract_article = new this.provider.web3.eth.Contract(
        abi_article,address_article,{
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
