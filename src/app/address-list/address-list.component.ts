import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
  mobile: any;
  addressDetails: any;
  agentPincode: any;
  agentId: any;
  custId: any;

  constructor(private router:ActivatedRoute,
    private registerService:RegisterService
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(
      (param)=>{
        this.mobile = param['mobile'];
        this.custId = param['custId']
        this.fetchAddress(this.mobile)
      }
    )
  }
fetchAddress(mobile:any){
  this.registerService.fetchAddress(mobile).subscribe(
    (address:any)=>{
      this.addressDetails = address['data']
    }
  )
}
fetchAgentPincodes(pincode:any){
  this.registerService.selectAgent(pincode).subscribe(
    (agentPincodes)=>{
      this.agentPincode = agentPincodes.data
    }
  )
  }
  selectAgentId(agentId:any){
  this.agentId = agentId.target.value;
  }
  saveAllocation(add:any){
var obj = {
  "agentId": this.agentId,
  "custId": this.custId,
  "addressId": add.id,
  "pincode": add.pin_code
}
this.registerService.CustAgentPinCodeMapping(obj).subscribe(
  (data:any)=>{
    alert('pincode allocated')
    // this.valueCust = undefined
  }
)
  }
}
