import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { RegisterService } from '../services/register.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agent-registeraion',
  templateUrl: './agent-registeraion.component.html',
  styleUrls: ['./agent-registeraion.component.scss']
})
export class AgentRegisteraionComponent implements OnInit {

  
  CustRegistrationForm: FormGroup;
  activeOptions = [
    { value: true, display: 'True' },
    { value: false, display: 'False' }
  ];
  typeOptions = [
    { value: '2', display: 'customer' },
    { value: '3' , display: 'agent' }
  ];

country:any
state:any
locality:any 
  url:any
  statName: any;
  pincodes: any;
  userType: any;
  cityData: any;
  cities: any;
  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private registerServices : RegisterService,
    private router: ActivatedRoute
  ) {
    this.router.params.subscribe(
      (param)=>{
        this.userType=''
        this.userType = param['userType']
       
        // this.searchUser(this.searchKey,this.searchValue,this.userType);
        
      }
    )
    this.CustRegistrationForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      userType: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      contact_person_name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      alt_mobile_no: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      aadhaarNumber: ['', Validators.required],
      active:[false],
      // agentAllotedPincodes:[],
      distributor_id:[13],
      addressReq: this.fb.group({
        short_name: ['', Validators.required],
        line1: ['', Validators.required],
        line2: [''],
        line3: [''],
        geo_tag: [''],
        journey_id: [0],
        localityId:[''],
        address: ['', Validators.required],
        country: ['', Validators.required],
        state_name: ['', Validators.required],
        city: ['', Validators.required],
        pin_code: ['', Validators.required],
        is_verified: [true],
        is_default: [true],
        
      })
    });

    this.url=environment.basUrl
  }
  ngOnInit(): void {
    
    this.selectCountry();
    this.fetchPincodes(13)
  }
  countryName:any;
  selectCountry(){
    this.registerServices.selectCountry().subscribe((countryData)=>{
      this.country = countryData
     })
      
  
  }
  selectState(countyCode:any){
  
   this.registerServices.selectState(countyCode).subscribe((statesData)=>{
    this.state = statesData
   })
    
  
  }
  selectCity(stateCode:any){
    this.registerServices.selectCity(stateCode).subscribe((localData:any)=>{
     this.cities = localData.data
    })
  }
  onSubmit() {
    if (this.CustRegistrationForm.valid) {
      alert('User registered successfully')
      console.log('Error registering user', this.CustRegistrationForm.value)
      this.registerServices.registerCustomer(this.CustRegistrationForm.value).subscribe(
        response => {
          console.log('User registered successfully', response);
          alert('User registered successfully')
          // Handle success
        },
        error => {
          console.error('Error registering user', error);
          // Handle error
        }
      );
    } else {
      console.log('Form is invalid');
      this.validateAllFormFields(this.CustRegistrationForm);
    }
  }

  // Function to mark all fields as touched for validation
  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }
  fetchPincodes(distId:any){
    this.registerServices.fetchPinCode(distId).subscribe(
      (pincodes)=>{
        this.pincodes = pincodes.data
      }
    )

  }
  selectLocality(cityId:any){
    this.registerServices.selectLocal(cityId).subscribe((localData:any)=>{
      this.locality = localData.data
     })
  }
}
