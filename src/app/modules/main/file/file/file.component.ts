import { Component, OnInit, Provider } from '@angular/core';
import { ProviderService } from 'src/app/services/provider/provider.service';
import { fileModel } from 'src/app/model/fileModel';
//Perssist
const abi_file = [ { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "fileId", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "filePath", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "fileSize", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "fileType", "type": "string" }, { "indexed": false, "internalType": "string", "name": "fileName", "type": "string" }, { "indexed": false, "internalType": "address payable", "name": "uploader", "type": "address" } ], "name": "FileUploaded", "type": "event" }, { "inputs": [], "name": "fileCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "files", "outputs": [ { "internalType": "uint256", "name": "fileId", "type": "uint256" }, { "internalType": "string", "name": "filePath", "type": "string" }, { "internalType": "uint256", "name": "fileSize", "type": "uint256" }, { "internalType": "string", "name": "fileType", "type": "string" }, { "internalType": "string", "name": "fileName", "type": "string" }, { "internalType": "address payable", "name": "uploader", "type": "address" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "index", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "getindexCounts", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "getindexArray", "outputs": [ { "internalType": "uint256[]", "name": "", "type": "uint256[]" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "string", "name": "_filePath", "type": "string" }, { "internalType": "uint256", "name": "_fileSize", "type": "uint256" }, { "internalType": "string", "name": "_fileType", "type": "string" }, { "internalType": "string", "name": "_fileName", "type": "string" } ], "name": "uploadFile", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" } ];
const address_file = '0x6CbBB416654EFD09fd8BB11c93FcC2f331a6098c';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  ngOnInit(): void {
  }
  //public files!: IFile[];
  public contract_file!:any;
  public result!:boolean;
  public index_array!:number[];

  public fileArray:fileModel[]=[];

  constructor(private provider:ProviderService){
    this.contract_file = new this.provider.web3.eth.Contract(
      abi_file,address_file,{
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

