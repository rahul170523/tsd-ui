import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { error } from 'jquery';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  searchKey: string = 'All';  // Default value for dropdown
  searchValue: string = 'All';      // Input value
  users: Array<any> = []; // Array to store user data
  activeStatus = [true,false]
  Formfile: any;
  fileName: any;
  distId: any;
  pincodes: any;
  searchText:any;
  constructor(
    private registerService: RegisterService
  ) { }

  ngOnInit(): void {
    if(this.searchKey != 'All'){
      this.searchValue = ''
    }
    this.searchUser(this.searchKey,this.searchValue);
  }
  allUser= 
  [
{
    "id": 1,
    "first_name": "Rahul",
    "last_name": "Sharma",
    "username": "rahulsharma",
    "password": "Abhi@123",
    "security_question": "What is your pet's name?",
    "security_answer": "Fluffy",
    "company_code": "11",
    "company_name": "Rajeev Milk Service",
    "contact_person_name": "Rajeev Gupta",
    "email": "abct@test.com",
    "pannum": "ABCDE1234F",
    "gstin": "22AAAAA0000A1Z5",
    "active": false,
    "enabled": false,
    "created_on": "2024-08-29T08:02:49.138+00:00",
    "last_updated_on": "2024-08-29T08:02:49.139+00:00",
    "created_by": "Admin",
    "last_updated_by": "Admin",
    "mobile": "9876543210",
    "addresses": [
        {
            "id": 1,
            "short_name": "Office",
            "line1": "123 Milk Lane",
            "line2": "Suite 456",
            "line3": "",
            "address": "123 Milk Lane, Suite 456, Dairy Town",
            "country": "India",
            "city": "Dairy Town",
            "state_name": "StateName",
            "geo_tag": "12.3456, 78.9012",
            "pin_code": "123456",
            "defaultAddress": true,
            "journey_id": null,
            "verifiedAddress": true,
            "mobile": "9876543210",
            "distributor": null,
            "customer": null
        }
    ]
},
{
  "id": 1,
  "first_name": "Rahul",
  "last_name": "Sharma",
  "username": "rahulsharma",
  "password": "Abhi@123",
  "security_question": "What is your pet's name?",
  "security_answer": "Fluffy",
  "company_code": "11",
  "company_name": "Rajeev Milk Service",
  "contact_person_name": "Rajeev Gupta",
  "email": "abct@test.com",
  "pannum": "ABCDE1234F",
  "gstin": "22AAAAA0000A1Z5",
  "active": false,
  "enabled": false,
  "created_on": "2024-08-29T08:02:49.138+00:00",
  "last_updated_on": "2024-08-29T08:02:49.139+00:00",
  "created_by": "Admin",
  "last_updated_by": "Admin",
  "mobile": "9876543210",
  "addresses": [
      {
          "id": 1,
          "short_name": "Office",
          "line1": "123 Milk Lane",
          "line2": "Suite 456",
          "line3": "",
          "address": "123 Milk Lane, Suite 456, Dairy Town",
          "country": "India",
          "city": "Dairy Town",
          "state_name": "StateName",
          "geo_tag": "12.3456, 78.9012",
          "pin_code": "123456",
          "defaultAddress": true,
          "journey_id": null,
          "verifiedAddress": true,
          "mobile": "9876543210",
          "distributor": null,
          "customer": null
      }
  ]
},
{
  "id": 1,
  "first_name": "Rahul",
  "last_name": "Sharma",
  "username": "rahulsharma",
  "password": "Abhi@123",
  "security_question": "What is your pet's name?",
  "security_answer": "Fluffy",
  "company_code": "11",
  "company_name": "Rajeev Milk Service",
  "contact_person_name": "Rajeev Gupta",
  "email": "abct@test.com",
  "pannum": "ABCDE1234F",
  "gstin": "22AAAAA0000A1Z5",
  "active": false,
  "enabled": false,
  "created_on": "2024-08-29T08:02:49.138+00:00",
  "last_updated_on": "2024-08-29T08:02:49.139+00:00",
  "created_by": "Admin",
  "last_updated_by": "Admin",
  "mobile": "9876543210",
  "addresses": [
      {
          "id": 1,
          "short_name": "Office",
          "line1": "123 Milk Lane",
          "line2": "Suite 456",
          "line3": "",
          "address": "123 Milk Lane, Suite 456, Dairy Town",
          "country": "India",
          "city": "Dairy Town",
          "state_name": "StateName",
          "geo_tag": "12.3456, 78.9012",
          "pin_code": "123456",
          "defaultAddress": true,
          "journey_id": null,
          "verifiedAddress": true,
          "mobile": "9876543210",
          "distributor": null,
          "customer": null
      }
  ]
},
{
  "id": 1,
  "first_name": "Rahul",
  "last_name": "Sharma",
  "username": "rahulsharma",
  "password": "Abhi@123",
  "security_question": "What is your pet's name?",
  "security_answer": "Fluffy",
  "company_code": "11",
  "company_name": "Rajeev Milk Service",
  "contact_person_name": "Rajeev Gupta",
  "email": "abct@test.com",
  "pannum": "ABCDE1234F",
  "gstin": "22AAAAA0000A1Z5",
  "active": false,
  "enabled": false,
  "created_on": "2024-08-29T08:02:49.138+00:00",
  "last_updated_on": "2024-08-29T08:02:49.139+00:00",
  "created_by": "Admin",
  "last_updated_by": "Admin",
  "mobile": "9876543210",
  "addresses": [
      {
          "id": 1,
          "short_name": "Office",
          "line1": "123 Milk Lane",
          "line2": "Suite 456",
          "line3": "",
          "address": "123 Milk Lane, Suite 456, Dairy Town",
          "country": "India",
          "city": "Dairy Town",
          "state_name": "StateName",
          "geo_tag": "12.3456, 78.9012",
          "pin_code": "123456",
          "defaultAddress": true,
          "journey_id": null,
          "verifiedAddress": true,
          "mobile": "9876543210",
          "distributor": null,
          "customer": null
      }
  ]
}
]
  searchUser(searchKey:any,searchValue:any) {
    // this.users = this.allUser;
    this.registerService.searchDistributor(searchKey,searchValue).subscribe(
      (users:any)=>{
        this.users = users.data
      },error=>{
        console.error(error)
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
    console.log('User saved:', user);
    // append and split first name and last name
    this.registerService.modifyDist(user.mobile,user).subscribe(
      (userData:any)=>{
        user = userData.data;
      }
    )
    // Implement logic to persist the changes, e.g., send data to a backend
  }
  upload(event:any) {
    // this.distId = distId
    this.Formfile = event.target.files[0];
    this.fileName = this.Formfile.name;
    console.log(this.Formfile.name);
    
  }
  captureDistId(distId:any){
    this.distId = distId;
  }
  onImport() {
    if (this.Formfile == undefined) {
      return;
    }
    //console.log("inside upload");
    var fd = new FormData();
    fd.append('file', this.Formfile);
     console.log('file',fd);
     this.registerService.uploadPinCode(this.distId,fd).subscribe(
      (pincodes:any)=>{
        alert('uploaded successfully')
      }
     )
  }  

  fetchPincodes(distId:any){
    this.registerService.fetchPinCode(distId).subscribe(
      (pincodes)=>{
        this.pincodes = pincodes.data
      }
    )

  }
  getIconColor(active:boolean){
  if(active){
    return 'bg-label-success'
  }
  else{
    return 'bg-label-danger'
  }
  }
}
