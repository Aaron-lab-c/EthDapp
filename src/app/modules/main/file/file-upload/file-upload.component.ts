import { Component, OnInit } from '@angular/core';
import { IPFSHTTPClient, create } from "ipfs-http-client";
import { ProviderService } from 'src/app/services/provider/provider.service';
import { BigNumber } from "bignumber.js";
import { fileModel } from 'src/app/model/fileModel';
import { ContractProviderService } from 'src/app/services/ContractProvider/contract-provider.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
    
  public abi_file = this.contractProvider.abi_file_provider;
  public address_file = this.contractProvider.address_file_provider;

  ngOnInit(): void {
  }
  public contract_file!:any;
  public result!:boolean;
  constructor(private provider: ProviderService,private contractProvider:ContractProviderService){
    this.contract_file = new this.provider.web3.eth.Contract(
      this.abi_file,this.address_file,{
        from: this.provider.address[0],
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
          .send({ from: this.provider.address[0],
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
