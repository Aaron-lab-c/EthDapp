import { Component, OnInit } from '@angular/core';
import { IPFSHTTPClient, create } from "ipfs-http-client";
import { ProviderService } from 'src/app/services/provider/provider.service';
import { BigNumber } from "bignumber.js";
import { fileModel } from 'src/app/model/fileModel';

//Perssist
const abi_file = [ { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "fileId", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "filePath", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "fileSize", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "fileType", "type": "string" }, { "indexed": false, "internalType": "string", "name": "fileName", "type": "string" }, { "indexed": false, "internalType": "address payable", "name": "uploader", "type": "address" } ], "name": "FileUploaded", "type": "event" }, { "inputs": [], "name": "fileCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "files", "outputs": [ { "internalType": "uint256", "name": "fileId", "type": "uint256" }, { "internalType": "string", "name": "filePath", "type": "string" }, { "internalType": "uint256", "name": "fileSize", "type": "uint256" }, { "internalType": "string", "name": "fileType", "type": "string" }, { "internalType": "string", "name": "fileName", "type": "string" }, { "internalType": "address payable", "name": "uploader", "type": "address" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "index", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "getindexCounts", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [], "name": "getindexArray", "outputs": [ { "internalType": "uint256[]", "name": "", "type": "uint256[]" } ], "stateMutability": "view", "type": "function", "constant": true }, { "inputs": [ { "internalType": "string", "name": "_filePath", "type": "string" }, { "internalType": "uint256", "name": "_fileSize", "type": "uint256" }, { "internalType": "string", "name": "_fileType", "type": "string" }, { "internalType": "string", "name": "_fileName", "type": "string" } ], "name": "uploadFile", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" } ];
const address_file = '0x6CbBB416654EFD09fd8BB11c93FcC2f331a6098c';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  ngOnInit(): void {
  }
  public contract_file!:any;
  public result!:boolean;
  constructor(private provider: ProviderService){
    this.contract_file = new this.provider.web3.eth.Contract(
      abi_file,address_file,{
        from: '0xae441a3175cbf45ba18fed634516154ec3ad0c66',
        gasPrice: '20000000000'
      });

    this.ipfs = create({
      host: 'localhost',
      port: 5001,
      protocol: 'http'
    });
  this.initialize();
  }
private async initialize() {
    if(typeof window === "undefined") return;
    this.untar = await require("js-untar");
}

public ipfs!: IPFSHTTPClient;
public untar!: any;
public inputFIle!: any;
public img:string="./src/app/static/IPFS.gif";
public file!: fileModel;
public path!: string;
public size!: number; 
public type!: string; 
public name!: string; 
  async uploadFile2(event: any) {
    try {
        this.file = event.target.files[0];
        this.size = this.file.size;
        this.type = this.file.type;
        this.name = this.file.name;
        console.log(this.file.size);
        console.log(this.file.type);
        console.log(this.file.name);

        const fileBuffer = await this.readFileAsArrayBuffer(event.target.files[0]);

        const blob = new Blob([fileBuffer], { type: this.file.type });
        const result = await this.ipfs.add(blob);
        console.log("result: "+result.cid);
        this.file.path = result.cid.toString();
        this.path = this.file.path;
        console.log(this.file.path);
            return result;

    } catch (error) {
      console.error('上傳檔案到 IPFS 時發生錯誤：', error);
      throw error;
    }
  }
  private readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.readyState === FileReader.DONE) {
          resolve(reader.result as ArrayBuffer);
        } else {
          reject(new Error('檔案讀取失敗'));
        }
      };

      reader.onerror = () => {
        reject(new Error('檔案讀取錯誤'));
      };

      reader.readAsArrayBuffer(file);
    });
  }
  async uploadFileMetadata() {
    console.log(this.provider.defaultAccount);
    try {
      await this.contract_file.methods
          .uploadFile(this.path, this.size, this.type, this.name)
          .send({ from: '0xae441a3175cbf45ba18fed634516154ec3ad0c66',
                  gas: 4000000
                })
          .then((result: any) => {/*
            console.log(result);
            this.result = true;*/
          }).catch((error: any) => {
            console.error(error);
            this.result = false;
          });
      } catch (error) {
        console.error(error);
        this.result = false;
      }

  }
}
