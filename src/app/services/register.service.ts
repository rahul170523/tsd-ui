import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
 
url:any
  constructor(
    private http:HttpClient
  ) { 
  this.url = environment.basUrl
  }

  
  registerCustomer(userData: any): Observable<any> {
    return this.http.post<any>(this.url + '8183/api/v1/tsd/cust/register', userData);
  }
 
  selectCountry(){
   return this.http.get(this.url + '8182/api/v1/tsd/countries')
  }
  selectState(code: any){
    return this.http.get(this.url + '8182/api/v1/tsd/states/' + code)
  }
  selectCity(Scode: any){
    return this.http.get(this.url + '8182/api/v1/tsd/city/' + Scode)
  }
  selectLocal(cityId: any){
    return this.http.get(this.url + '8182/api/v1/tsd/locality/cityId/' + cityId)
  }
  fetchPincodes(pincode:any){
   // 8082/api/v1/tsd/locality/pincode/<pincode>
   return this.http.get(this.url + '8182/api/v1/tsd/locality/pincode/' +   pincode)
  }
  fetchCustomerDetails(localityId:any){
    return this.http.get(this.url + '8184/api/v1/tsd/add/fetchCustForLocality/' +   localityId)
  }
//Distributor Api
  searchDistributor(key:any,value:any){
    return this.http.get(this.url + '8181/api/v1/tsd/dist/fetch/' + key + '/'+ value)
  }
  modifyDist(mobile:any , user:any){
    ///update/{mobilenumber}
    return this.http.put(this.url + '8181/api/v1/tsd/dist/update/' + mobile, user)
  }
  registerDistributor(userData: any): Observable<any> {
    return this.http.post<any>(this.url + '8181/api/v1/tsd/dist/register', userData);
  }

  modifyUser(key:any,value:any){
    return this.http.patch(this.url + '8183/api/v1/tsd/cust/update/' + key, value)
  }
  searchUser(key:any,value:any,usertype:any){
    return this.http.get(this.url + '8183/api/v1/tsd/cust/fetch/' + key + '/'+ value + '/'+usertype)
  }
 uploadPinCode(distId:any,file:any){
  ///api/v1/tsd/pincode/upload/{distId}
  return this.http.post<any>(this.url + '8182/api/v1/tsd/pincode/upload/'+distId, file);
 }
 fetchPinCode(distId:any){
  ///api/v1/tsd/pincode/upload/{distId}
  return this.http.get<any>(this.url + '8182/api/v1/tsd/pincode/fetch/'+distId);
 }
 allocatePincode(agentId:any,pincodes:any){
  return this.http.post<any>(this.url + '8182/api/v1/tsd/pincode/agentPinCodeMapping/'+agentId + '/' + pincodes,'')
}

fetchAgentsPincodes(agentId:any){
  //api/v1/tsd/pincode/fetchAgentPinCode/{agentId}
  return this.http.get<any>(this.url + '8182/api/v1/tsd/pincode/fetchAgentPinCode/'+agentId);
}
fetchCustomerPincodes(pincodes:any){
//api/v1/tsd/pincode/{pincode}
//api/v1/tsd/add/fetchAgentForLocality/{pincode}/{localityId}
return this.http.get<any>(this.url + '8182/api/v1/tsd/pincode/'+pincodes);
}
fetchAgentForLocality(pincode:any,localityId:any){
  return this.http.get<any>(this.url + '8184/api/v1/tsd/add/fetchAgentForLocality/'+pincode + '/' + localityId);
}
login(value: any){
  ///api/v1/tsd/auth
  return this.http.post(this.url + '8185/api/v1/tsd/auth', value)
}
fetchCustomerAdd(mobile:any){
  //api/v1/tsd/add/fetch/{mobile}
  return this.http.get<any>(this.url + '8184/api/v1/tsd/add/fetch/'+mobile);
}
//http://localhost:8182/api/v1/tsd/pincode/201301
selectAgent(customerPincode:any){
  return this.http.get<any>(this.url + '8182/api/v1/tsd/pincode/'+customerPincode);
}
///CustAgentPinCodeMapping
CustAgentPinCodeMapping(value:any){
  return this.http.post(this.url + '8182/api/v1/tsd/pincode/custAgentPinCodeMapping', value) 
}
// product Api

fetchproducts(){
  //api/v1/tsd/prd/fetch
 return this.http.get<any>(this.url + '8186/api/v1/tsd/prd/fetch');
}

fetchProductCategory(){
  //http://10.10.5.3:8182/api/v1/tsd/product/catalogue
  return this.http.get<any>(this.url + '8182/api/v1/tsd/product/catalogue');
}
fetchProductSubCategory(parentId:any){
  //http://10.10.5.3:8182/api/v1/tsd/product/catagory/{parentId}
  return this.http.get<any>(this.url + '8182/api/v1/tsd/product/catagory/' + parentId);
}
addProduct(value:any){
//api/v1/tsd/prd/create
return this.http.post(this.url + '8186/api/v1/tsd/prd/create', value)
}

fetchAddress(mobile: any) {
  //api/v1/tsd/add/fetch/{mobile}
  return this.http.get(this.url + '8184/api/v1/tsd/add/fetch/' + mobile)
}
///api/v1/tsd/subs/create
subscribeProd(value:any){
  return this.http.post(this.url + '8187/api/v1/tsd/subs/create', value)
}
}
