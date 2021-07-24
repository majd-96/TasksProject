import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../Services/user.service';


interface User {
username:string,
  id?: number;
  name: string;
  Title: string;
  Gender: string;
  Experince: string;
}

const COUNTRIES: User[] = [

];
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  page = 1;
  pageSize = 4;
  collectionSize = COUNTRIES.length;
  countries:any ;
  Users:any [] = [{}];

  test:any;

  constructor(private userService : UserService) {
    this.refreshCountries();
    
  }
  ngOnInit(): void {
    this.GetAllUsers();
  }

  refreshCountries() {
    this.countries = COUNTRIES
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  onClick(f:NgForm){
    console.log(f);
    let testControl  = f.form.controls.test;
    console.log(testControl.value)
  }

  GetAllUsers(){
   this.userService.GetAllUsers().subscribe(res=>{
     console.log(res);
    this.Users = res.data;
   } ,(error:any) =>{
     alert(error);
   } );
  }


  
}
