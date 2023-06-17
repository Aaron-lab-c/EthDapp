import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
  selector: 'app-profile-set',
  templateUrl: './profile-set.component.html',
  styleUrls: ['./profile-set.component.css']
})
export class ProfileSetComponent implements OnInit{
  public username!:String;
  public introduce!:String;
  public useraddress!:String;
  public P_username!:String;
  public P_introduce!:String;
  public P_useraddress!:String;
  //用來裝合約instance
  public contract_profile!:any;
  public result1!:boolean;
  public result2!:boolean;
  public result3!:boolean;

  public abi_profile = this.provider.abi_profile_provider;
  public address_profile = this.provider.address_profile_provider;

  ngOnInit(): void {
  }

  constructor(private provider:ProviderService){
      this.contract_profile = new this.provider.web3.eth.Contract(
      this.abi_profile,this.address_profile,{
        from: this.provider.defaultAccount,
        gasPrice: '20000000000'
      });
      this.display();
  }

  public async setUsername(): Promise<boolean> {
    try {
      await this.contract_profile.methods
        .setUsername(
          this.username
        )
        .send({
          from: this.provider.address[0],
          gas: 4000000 // 設定適當的 gas 限制
        }).then((result: any) => {
          console.log(result);
        });

      this.result1 = true;
      return true;
    } catch (error) {
      console.error(error);
      this.result1 = false;
      return false;
    }
  }



  public async setintroduce(): Promise<boolean> {

    try {
      await this.contract_profile.methods
        .setIntroduce(
          this.introduce
        )
        .send({
          from: this.provider.address[0],
          gas: 4000000 // 設定適當的 gas 限制
        }).then((result: any) => {
          console.log(result);
        });

      this.result2 = true;
      return true;
    } catch (error) {
      console.error(error);
      this.result2 = false;
      return false;
    }
  }


  public async setuseraddress(): Promise<boolean> {
    console.log("constructor:"+this.provider.address[0]);
    this.useraddress = this.provider.address[0];
    try {
      await this.contract_profile.methods
        .setUseraddress()
        .send({
          from: this.provider.address[0],
          gas: 4000000 // 設定適當的 gas 限制
        }).then((result: any) => {
          console.log(result);
        });

      this.result3 = true;
      return true;
    } catch (error) {
      console.error(error);
      this.result3 = false;
      return false;
    }
  }

  async display(): Promise<void>{
    console.log("ADDRESS"+this.provider.defaultAccount);
    await this.contract_profile.methods.mapProfiles(this.provider.address[0]).call(
      {
        from: this.provider.address[0],
      }).then((result: any) => {
          console.log("result.username"+result.useraddress);
          this.P_username = result.username;
          this.P_introduce = result.introduce;
          this.P_useraddress = result.useraddress;
        
        console.log(result);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}

