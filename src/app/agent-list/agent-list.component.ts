import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit {

  searchKey: string = 'All';  // Default value for dropdown
  searchValue: string = 'All';      // Input value
  users: Array<any> = []; // Array to store user data
  activeStatus = [true,false]
  pincodes: any;
  selectedPincodes: any=[];
  agentId: any;
  userType: any;
  searchText:any;
  distId: any;
  agentPincodes: any;
  picnCollection: any=[];
  custpincodes: any;
  customerAddress: any;
  agentPincode: any;
  assignedpincodes: any;
  customerAddObj: any;
  selectedPincode: any;
  customerId: any;
  // value: { agentid: any; custid: any; pincode: any; };
  valueCust: any;
  constructor(
    private registerService: RegisterService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(
      (param)=>{
        this.userType = param['userType']
        if(this.userType=='customer'){
          this.userType = 2
        }
        else if(this.userType=='agent')
        {
          this.userType = 3  
        }
        this.searchUser(this.searchKey,this.searchValue,this.userType);
      }
    )
    if(this.searchKey != 'All'){
      this.searchValue = ''
    }
  }
  searchAgent(userType:any){
     this.userType = userType
  }
  searchUser(searchKey:any,searchValue:any,userType:any) {
    this.registerService.searchUser(searchKey,searchValue,userType).subscribe(
      (users:any)=>{
        this.users = users.data
        console.log(users)
      }
    )
  }

  addUser() {-
    // Implement the logic to add a new user
    console.log('Add user button clicked');
  }

  editUser(user: any) {
    user.isEditing = true;
  }

  saveUser(user: any) {
    user.isEditing = false;
    this.registerService.modifyUser(user.mobile,user).subscribe(
      (user : any) => {
      this.users=user.data;
       this.searchUser(this.searchKey,this.searchValue,this.userType);
      }
    )
  }

  fetchPincodes(distId:any,agentId:any){
    this.distId = distId;
    this.agentId = agentId
    this.selectedPincodes = []
    this.registerService.fetchPinCode(this.distId).subscribe(
      (pincodes)=>{
        this.pincodes = pincodes.data;
        
        
      }
    )

  }
  selectPinCodes(pincode:any){
   this.selectedPincodes.push(pincode)
  }
  allocatePinCode(){
    this.registerService.allocatePincode(this.agentId,this.selectedPincodes.join()).subscribe(
      (data)=>{
        alert('pincode allocated')
      }
    )
  }
  fetchAgentId(agentId:any){
  this.agentId = agentId
  }

  getAllocatedPincodes(agentId:any){
    this.registerService.fetchAgentsPincodes(agentId).subscribe(
      (agentpins:any)=>{
        this.agentPincodes = agentpins.data;
        this.picnCollection = []
        this.agentPincodes.forEach((element:any) => {
          element.forEach((element1:any) => {

            this.picnCollection.push(element1)
            
          });
        });
        console.log(this.picnCollection);
      }
    )
  }
 fetchCustomer(pincodes:any){
  this.registerService.fetchAgentsPincodes(pincodes).subscribe(
    (pincodes)=>{
      this.custpincodes = pincodes.data
    }
  )
 }
 fetchCustomerAddress(mobile:any,customerId?:any){
  this.customerId = customerId;
  this.registerService.fetchCustomerAdd(mobile).subscribe(
    (address)=>{
      this.customerAddress = address.data;
      this.customerAddress.forEach((element:any) => {
        this.fetchCustomerPincodes(element.pin_code)
      });
   
    }
  )
 }
fetchCustomerPincodes(pincode:any){
this.registerService.selectAgent(pincode).subscribe(
  (agentPincodes)=>{
    this.agentPincode = agentPincodes.data
  }
)
}
caputreCustomerData(add:any){
  console.log(add);
this.customerAddObj = add
}
caputrePincode(event:any){

this.assignedpincodes = event.target.innerText
}
assignAgentPincodes(){
  this.valueCust = {
    "agentId": this.agentPincode[0].agentId,
    "custId": ""+this.customerId,
    "pincode": this.agentPincode[0].pincode

  }
this.registerService.CustAgentPinCodeMapping(this.valueCust).subscribe(
  (data:any)=>{
    alert('pincode allocated')
    this.valueCust = undefined
  }
)
}
}
