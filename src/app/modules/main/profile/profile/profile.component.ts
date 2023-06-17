import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  public username:String = "";
  public introduce:String = "";
  public useraddress:String = "";
  //用來裝合約instance
  public contract_profile!:any;

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
  async display(): Promise<void>{
    console.log("ADDRESS"+this.provider.defaultAccount);
    await this.contract_profile.methods.mapProfiles(this.provider.address[0]).call(
      {
        from: this.provider.address[0],
      }).then((result: any) => {
          console.log("result.username"+result.useraddress);
          this.username = result.username;
          this.introduce = result.introduce;
          this.useraddress = result.useraddress;
        
        console.log(result);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}
