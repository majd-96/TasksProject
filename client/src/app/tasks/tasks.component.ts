import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from '../Services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: 'tasks.component.html',
  styleUrls: ['tasks.component.css']
})
export class TasksComponent implements OnInit{

  constructor(private tasksService : TasksService , private route : Router) { }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

  AddTask(f:NgForm){
    debugger;
    let Task = {
      ApplicantName : f.form.controls.ApplicantName.value,
      ApplicantTitle:f.form.controls.ApplicantTitle.value ,
      Gender : f.form.controls.Gender.value,
      Education:f.form.controls.Education.value ,
      Experince:f.form.controls.Experince.value ,
      Years :f.form.controls.Years.value
    };
    this.tasksService.AddTask(Task).subscribe(res=>{
      debugger;
      alert("Done!");    
      this.route.navigate(['/Admin']);
      f.reset();
    }, 
    (error:any)=>{
      alert(error.error);    
    });
  }
}
