import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../services/register.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productForm: FormGroup;
  distId: any;
  ratingOptions: number[] = [1, 2, 3, 4, 5];
  categoryOptions: any; 
  subCategoryOptions: any;
  returnPolicy:string[] = ['returnable','Non-returnable']
  CategoryOptions1: any;
  constructor(private fb: FormBuilder,
     private router:ActivatedRoute,
     private registerService: RegisterService
  ) 
  {
    this.productForm = this.fb.group({
      rating: ['', Validators.required],
      brand_id: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      features: [''],
      shelf_life: [''],
      unit_display: [''],
      unit: [''],
      unit_type: [''],
      weight_display: [''],
      weight_g: [''],
      mrp: [''],
      // image_url: [''],
      prd_type: [''],
      return_policy: [''],
      product_class: [''],
      packaging_type: [''],
      product_group: [''],
      category: ['', Validators.required],
      sub_category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.router.params.subscribe(
      (param)=>{
       this.distId = param['distId'];
       this.fetchCategory();
      }
    )
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      console.log('Form Submitted', this.productForm.value);
      this.registerService.addProduct(this.productForm.value).subscribe(
        (data)=>{
          alert('product created successfully')
        }
      )
    } else {
      console.log('Form not valid');
    }
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
}

