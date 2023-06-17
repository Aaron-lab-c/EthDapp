import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { IPFSHTTPClient, create } from "ipfs-http-client";
import { fileModel } from 'src/app/model/fileModel';
import { ContractProviderService } from 'src/app/services/ContractProvider/contract-provider.service';
import { ProviderService } from 'src/app/services/provider/provider.service';
const untar = require("js-untar");


@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent implements OnInit{
    
  public abi_file = this.contractProvider.abi_file_provider;
  public address_file = this.contractProvider.address_file_provider;

  ipfs: any;
  ngOnInit(): void {
  }
  public path!: string;
  public size!: number; 
  public type!: string; 
  public name!: string; 
  public contract_file!:any;
  public result!:boolean;
  public url!:string;
  public safeurl!:SafeResourceUrl;
  @Input()
  public num!: number;
  @Input()
  public index!: number;
  @Input()
  public filedetail!: fileModel;

  constructor(private provider:ProviderService,public sanitizer: DomSanitizer,private contractProvider:ContractProviderService){
    this.contract_file = new this.provider.web3.eth.Contract(
      this.abi_file,this.address_file,{
        from: this.provider.defaultAccount,
        gasPrice: '20000000000'
      });
      this.ipfs = create({
        host: 'localhost',
        port: 5001,
        protocol: 'http'
    });
  }
  /*
  async getFile(): Promise<void>{
    console.log("getFile()");
  try{
        await this.contract_file.methods.files(this.index).call(
          {
            from: this.provider.defaultAccount,
          }).then((result: any) => {
            console.log("file:"+result);
            this.size = result.size;
            this.type = result.type;
            this.name = result.name;
            this.path = result.path;
          })
          .catch((error: any) => {
            console.error(error);
          });
        } catch (error) {
          console.error(error);
          this.result = false;
        }
  }*/
  async getFilesdetail(): Promise<boolean>{
      try {
        await this.contract_file.methods
          .files(this.index)
          .call({
            from: this.provider.address[0],
          }).then((result: any) => {
            console.log(result.fileName);
            this.name = result.fileName;
            this.type = result.fileType;
            this.size = result.fileSize;
            this.path = result.filePath;

          });
        this.result = true;
      } catch (error) {
        console.error(error);
        this.result = false;
        return false;
      }
      return true;

    }


    async download() {
      if(typeof window === "undefined") return;
      const iterable = this.ipfs.get(this.filedetail.path);
      var chunks: Uint8Array[] = [];
      for await (const b of iterable) {
          chunks.push(b);
      }
      console.log("uint8array:"+chunks);
      const tarball = new Blob(chunks, { type: 'application/x-tar' })
      const tarAsArrayBuffer = await tarball.arrayBuffer();
      const result2 = await untar(tarAsArrayBuffer);
      const resultFile = new Blob([result2[0].buffer], { type: 'image/jpeg' })
      var url = window.URL.createObjectURL(resultFile);
      console.log("url:"+url+" filedetail.name:"+this.filedetail.name);
      this.downloadURL(url, this.filedetail.name);
  }

    private downloadURL(data: any, fileName: string) {
      var a;
      a = document.createElement('a');
      a.href = data;
      a.download = fileName;
      console.log("a: " +a);
      document.body.appendChild(a);
      a.click();
      a.remove();
  };
  public viewDetail(){
    this.url="http://localhost:8080/ipfs/"+this.filedetail.path;
    this.safeurl= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    console.log(this.url);
  }
}
  
  
  /*
  async run(): Promise<void> {
    try {
      console.log("s");
      let s = await this.getFilesList(); // 等待 A 完成
      console.log("s2");
      let s2 = await this.getFilesdetail(); // A 完成後再執行 B
    }catch (error) {
      console.error(error);
      this.result = false;
    }
  }*/

