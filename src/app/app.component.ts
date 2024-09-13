import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'registration-form';
  searchKey: string = 'mobile';  // Default value for dropdown
  searchValue: string = '';      // Input value
  router: any;
  users: { key: string, value: string }[] = []; // Array to store added users
  enableLogin: boolean | any;
  routerurl: any;
  constructor(private _router: Router){
   this.router = _router.url;
  console.log(_router.url)
  _router.events.forEach((event) => {

    if(event instanceof NavigationStart) {
      this.routerurl = event.url
      console.log(this.routerurl);
      if(event.url.includes('login')){
        this.enableLogin = true;
        // this.headerOptions.heading='Suite'
       
        
      }
      else{
        this.enableLogin = false;
      }
    }
  //   if(this.disableRightClick){
  //   if(event instanceof NavigationStart) {
  //     if(!event.url.includes('test')){
  //         this.rightClick.disableRightClick();
  //     }
  //   }
  // }
  });
  }
  searchUser() {
    if (this.searchValue.trim()) {
      this.users.push({ key: this.searchKey, value: this.searchValue });
      this.searchValue = '';  // Clear the input field after adding
    }
  }
}
