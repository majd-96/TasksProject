import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';
import { AdminComponent } from './admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';




const routes: Routes = [
  { path: '', component: LoginComponent } ,
  {path:'Admin' , component : AdminComponent} ,
  {path:'Tasks' , component:TasksComponent}
];

@NgModule({
  declarations: [
   
    AppComponent,
    LoginComponent,
    TasksComponent,
    AdminComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),

    
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],

  
})


export class AppModule { }
