export class fileModel {
    id!:number;
    path!: any;
    size!: number;
    type!: string;
    name!: string;
    uploader!: string;
    constructor (
        _id:number,_path:any, _size:number, _type:string,_name:string,_uploader:string){
        this.id = _id;
        this.path=_path;
        this.size=_size;
        this.type=_type;
        this.name=_name;
        this.uploader=_uploader;
    }
}
