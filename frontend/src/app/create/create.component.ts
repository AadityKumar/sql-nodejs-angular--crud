import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {ApiserviceService} from '../apiservice.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service:ApiserviceService, private route:ActivatedRoute) { }

  errormsg:any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
    this.getparamid= this.route.snapshot.paramMap.get('id');
    if(this.getparamid){
      this.service.getSingleData(this.getparamid).subscribe((res)=>{
        this.userForm.patchValue({
           id:res.data[0].id,
           name:res.data[0].name,
           email:res.data[0].email,
           mobile:res.data[0].mobile
        })
    })
    }
    
  }

  userForm=new FormGroup({
      'id':new FormControl('',Validators.required),
      'name':new FormControl('',Validators.required),
      'email':new FormControl('',Validators.required),
      'mobile': new FormControl('',Validators.required)
      
  })
   //new user
  userSubmit(){
      if(this.userForm.valid){
          this.service.createData(this.userForm.value).subscribe((res)=>{
              this.userForm.reset();
              this.successmsg=res.message;
          })
      }else{
        this.errormsg="all field are required !"
      }
              
  }


  //update data
  userUpdate(){
    if(this.userForm.valid){
      this.service.updateData(this.userForm.value,this.getparamid).subscribe((res)=>{
       this.successmsg=res.message
      })
    }else{
     this.errormsg='all fields are required !'
    }
  }
}
