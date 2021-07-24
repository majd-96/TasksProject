import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})
export class LoginComponent implements OnInit {
  Email: string = '';
  password: string = '';
  isEmailValid: boolean = true;
  error: any = null;


  // myimage:string= "assets/img/R.jpg";

  constructor( 
    
private loginService : LoginService , private route : Router ) { }


ngOnDestroy(): void {
  throw new Error('Method not implemented.');
}

  ngOnInit(): void {
    
  }

  // loginuser(f:NgForm){

  //   let createDefaultAdmin ={
  //     Email : f.form.controls.loginUser.value,
  //   password :f.form.controls.loginPassword.value

  //   };
  //   this.loginService.loginuser(createDefaultAdmin).subscribe(res=>{
  //     debugger;
  //     alert("Done!");    
  //     this.route.navigate(['/Admin']);
  //     f.reset();
  //   }, 
  //   (error:any)=>{
  //     alert(error.error);    
  //   });
  // }

  }

