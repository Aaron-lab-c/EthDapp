export class TransactionModel {
    from?: string;
    to?: string;
    value?: number|string;
    
    constructor (_from:string, _to:string, _value:number|string){
        this.from=_from;
        this.to=_to;
        this.value=_value;
    }
}