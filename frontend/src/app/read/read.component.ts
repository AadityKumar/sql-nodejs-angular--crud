import { Component, OnInit } from '@angular/core';
import {ApiserviceService} from '../apiservice.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private service:ApiserviceService) { }
   readData:any;
   successmsg:any;

  ngOnInit(): void {
    this.getAllData();  // or here function can write(get all data)
  }
  
  // delete data by id
  deleteID(id:any){
    this.service.deleteData(id).subscribe((res)=>{
        this.successmsg=res.message;
        this.getAllData();   // use here so, after delete all data get update simultaniously
    })
  }


  //get all data
  getAllData(){
    this.service.getAllData().subscribe((res)=>{
      console.log(res)
      this.readData=res.data;
    });
  }

}
