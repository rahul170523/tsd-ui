import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentRegisteraionComponent } from './agent-registeraion/agent-registeraion.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserListComponent } from './user-list/user-list.component';
import { AgentListComponent } from './agent-list/agent-list.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthService} from './auth.service'
import { AllocateCustomersComponent } from './allocate-customers/allocate-customers.component';
import { ProductsComponent } from './products/products.component';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddressListComponent } from './address-list/address-list.component';

const routes: Routes = [
  {path: 'Customer/:userType', component: AgentRegisteraionComponent},
  {path: 'Register', component: RegistrationComponent },
  {path: 'Distributor', component: UserListComponent },
  {path: 'customersList/:userType' , component: AgentListComponent },
  {path: 'login', component: LoginComponent },
  {path: 'dashboard', component: DashboardComponent },
  {path: 'allocatecustomer/:userType/:distId/:custId', component:AllocateCustomersComponent},
  {path: 'product-form/:distId', component:ProductsComponent},
  {path: 'subscribe/:created_by/:custId', component:SubscriptionFormComponent},
  {path: 'product-search', component:ProductDetailsComponent},
  {path: 'address/:mobile/:custId', component:AddressListComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
