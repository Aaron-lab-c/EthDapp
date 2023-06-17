export class AuctionModel {
    product_name!: string;
    product_introduce!: string;
    product_price!: number;
    owner!: string;
    index!: number;
    constructor (
        _product_name:string, _product_introduce:string, _product_price:number,_owner:string,_index:number){
        this.product_name=_product_name;
        this.product_introduce=_product_introduce;
        this.product_price=_product_price;
        this.owner=_owner;
        this.index=_index;
    }
}
