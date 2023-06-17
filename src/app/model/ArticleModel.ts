


export class ArticleModel {
    author!: string;
    title!: string;
    content!: string;
    commentCount!: number;
    ArticleId!:number;
    comments!:commentModel[];
    constructor (_author:string, _title:string, _content:string, _commentCount:number){
        this.author=_author;
        this.title=_title;
        this.content=_content;
        this.commentCount=_commentCount;
    }
}

export class commentModel {
    commenter!: string;
    content!: string;
    constructor (_commenter:string, _content:string){
        this.commenter=_commenter;
        this.content=_content;
    }
}