import { Component, OnInit, Provider } from '@angular/core';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { fileModel } from 'src/app/model/fileModel';
import { ContractProviderService } from 'src/app/services/ContractProvider/contract-provider.service';


@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  
  public abi_file = this.contractProvider.abi_file_provider;
  public address_file = this.contractProvider.address_file_provider;

  ngOnInit(): void {
  }
  //public files!: IFile[];
  public contract_file!:any;
  public result!:boolean;
  public index_array!:number[];

  public fileArray:fileModel[]=[];

  constructor(private provider:ProviderService,private contractProvider:ContractProviderService){
    this.contract_file = new this.provider.web3.eth.Contract(
      this.abi_file,this.address_file,{
        from: this.provider.defaultAccount,
        gasPrice: '20000000000'
      });
      this.run();
  }

  async getFilesCount(): Promise<boolean>{
    try {
      await this.contract_file.methods
        .getindexCounts()
        .call({
          from: this.provider.address[0],
        }).then((result: any) => {
          console.log("getFilesCount():"+result);
        });
      this.result = true;
      return true;
    } catch (error) {
      console.error(error);
      this.result = false;
      return false;
    }
  }

  async getFilesList(): Promise<boolean>{
    try {
      await this.contract_file.methods
        .getindexArray()
        .call({
          from: this.provider.address[0],
        }).then((result: any) => {
          console.log("getFilesList():"+result[0]);
          this.index_array=result;
          console.log("getFilesList():"+this.index_array[0]);

        });
      this.result = true;
      return true;
    } catch (error) {
      console.error(error);
      this.result = false;
      return false;
    }
  }
  async getFilesdetail(i:number): Promise<void>{
    try {
      await this.contract_file.methods
        .files(this.index_array[i])
        .call({
          from: this.provider.address[0],
        }).then((result: any) => {
          let file:fileModel = new fileModel(0,"",0,"","","");
          console.log(result.fileName);
          file.name = result.fileName;
          file.type = result.fileType;
          file.size = result.fileSize;
          file.path = result.filePath;
          file.uploader = result.uploader;
          this.fileArray.push(file);
        });
    } catch (error) {
      console.error(error);
      this.result = false;
    }
  }
    async run(): Promise<void> {
      try {
        console.log("s");
        let s = await this.getFilesList(); // 等待 A 完成
        console.log("s2");
        for(let i = 0; i< this.index_array.length;i++){
          let s2 = await this.getFilesdetail(i); // A 完成後再執行 B
        }

        console.log(this.fileArray);
      }catch (error) {
        console.error(error);
        this.result = false;
      }
  }
}

