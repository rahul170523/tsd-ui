import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss']
})
export class SubscriptionFormComponent implements OnInit {
  scheduleForm: FormGroup;
  subscriptionType:any[]=[
    
    {
      'id' :1, 
      'name': "Daily"
    },

    {
      'id':2,
      'name':'Weekly'

    },
    {
      'id':3,
      'name':'Monthly'

    }
    ]
  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  days = [1,2,3,4,5]
  statusOptions: any[] = [0, 1]; // Example status options
  categoryOptions: any;
  subCategoryOptions: any;
  CategoryOptions1: any;
  custId: any;
  created_by: any;
  subType: any;

  constructor(private fb: FormBuilder,
    private registerService:RegisterService,
    private router: ActivatedRoute
  ) {
    this.scheduleForm = this.fb.group({
      type: [''],
      day_of_week: [''],
      day_of_month: [''],
      status: [''],
      start: [''],
      stop: [''],
      product_id: [''],
      quantity: [''],
      pause_date: [''],
      resume_date: [''],
      permanent: [false],
      visible: [false],
      product_group: [''],
      category: [''],
      sub_category: [''],
    });
  }

  ngOnInit(): void {
    this.router.params.subscribe(
      (param)=>{
       this.custId = param['custId'];
       this.created_by = param['created_by'];
       this.fetchCategory();
      }
    )
    this.fetchCategory()
  }

  
  fetchCategory(){
    this.registerService.fetchProductCategory().subscribe(
      (catData:any)=>{
        this.categoryOptions=catData['data']
      }
    )
  }
  fetchSubCategory(parentId:any){
    this.registerService.fetchProductSubCategory(parentId).subscribe(
      (subCat)=>{
        this.subCategoryOptions = subCat['data'];
      }
    )
  }
  fetchCategories(parentId:any){
    this.registerService.fetchProductSubCategory(parentId).subscribe(
      (subCat)=>{
        this.CategoryOptions1 = subCat['data'];
      }
    )
  }
  onSubmit(): void {
    if (this.scheduleForm.valid) {
      console.log('Form Submitted', this.scheduleForm.value);
      var finalObj = this.scheduleForm.value
      // "customer_id": 0,
  // "distributor_id": 0,
       finalObj['distributor_id'] = this.created_by;
       finalObj['customer_id'] = this.custId;
      this.registerService.subscribeProd(finalObj).subscribe(
        (data:any)=>{
          alert('Subscribed successfully')
        }
      )
    } else {
      console.log('Form not valid');
    }
  }
  selectSubType(subType:any){
    this.subType = subType
  }
}