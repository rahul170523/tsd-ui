import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  searchText:any;
Products: any;
  constructor(
    private registerService:RegisterService
  ) { }

  ngOnInit(): void {
    this.fetchproductDetails()
  }

  fetchproductDetails(){
    this.registerService.fetchproducts().subscribe(
      (productData:any)=>{
        this.Products = productData.data;
      }
    )
  }
}
