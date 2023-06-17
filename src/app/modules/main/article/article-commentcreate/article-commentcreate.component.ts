import { Component, Input, OnInit } from '@angular/core';
import { ArticleModel, commentModel } from 'src/app/model/ArticleModel';
import { ProviderService } from 'src/app/services/provider/provider.service';
//合約abi
const abi_article=[ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "article_index", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "articles", "outputs": [ { "internalType": "address", "name": "author", "type": "address" }, { "internalType": "string", "name": "title", "type": "string" }, { "internalType": "string", "name": "content", "type": "string" }, { "internalType": "uint256", "name": "commentCount", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "comments", "outputs": [ { "internalType": "address", "name": "commenter", "type": "address" }, { "internalType": "string", "name": "content", "type": "string" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "lastest_article", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "string", "name": "_title", "type": "string" }, { "internalType": "string", "name": "_content", "type": "string" } ], "name": "publishArticle", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_articleId", "type": "uint256" }, { "internalType": "string", "name": "_content", "type": "string" } ], "name": "postComment", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_articleId", "type": "uint256" } ], "name": "getArticle", "outputs": [ { "components": [ { "internalType": "address", "name": "author", "type": "address" }, { "internalType": "string", "name": "title", "type": "string" }, { "internalType": "string", "name": "content", "type": "string" }, { "internalType": "uint256", "name": "commentCount", "type": "uint256" } ], "internalType": "struct Articles.Article", "name": "", "type": "tuple" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "getArticle_index", "outputs": [ { "internalType": "uint256[]", "name": "", "type": "uint256[]" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "uint256", "name": "_articleId", "type": "uint256" }, { "internalType": "uint256", "name": "_commentId", "type": "uint256" } ], "name": "getComment", "outputs": [ { "components": [ { "internalType": "address", "name": "commenter", "type": "address" }, { "internalType": "string", "name": "content", "type": "string" } ], "internalType": "struct Articles.Comment", "name": "", "type": "tuple" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "uint256", "name": "_articleId", "type": "uint256" } ], "name": "getAllComment", "outputs": [ { "components": [ { "internalType": "address", "name": "commenter", "type": "address" }, { "internalType": "string", "name": "content", "type": "string" } ], "internalType": "struct Articles.Comment[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function", "constant": true } ];
//權限管理合約地址
const address_article= '0x18cbD8371D8B12E19964e515fbbACF2e08D0728e';

@Component({
  selector: 'app-article-commentcreate',
  templateUrl: './article-commentcreate.component.html',
  styleUrls: ['./article-commentcreate.component.css']
})
export class ArticleCommentcreateComponent implements OnInit {
  //用來裝合約instance
  public contract_article!:any;

  @Input()
  public ArticleId!:number;

  public commentmodel!:commentModel;
  public result!:boolean;

  constructor(private provider : ProviderService) {
    this.commentmodel = new commentModel('','');

    //產生管理權限合約的instance
    this.contract_article = new this.provider.web3.eth.Contract(
      abi_article,address_article,{
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