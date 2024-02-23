import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/todo';
import { TodoService } from 'src/app/service/todo.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {

  
  dataObj:Employee = new Employee();
  dataArr:Employee[]=[]

  addName:string='';
  addCmpName:string='';
  addEmail:string='';
  addSalary: any

  pfRate:number=0.12;
  calPf:number | undefined;


  updnm:string='';
  updcmpnm:string=''
  updsal:any
  updEml:string='';


  constructor(private service:TodoService) { }


  ngOnInit(): void {
    this.addName=''
    this.addCmpName=''
    this.addEmail=''
    this.addSalary=''
    
    this.updnm=''
    this.updEml=''
    this.updcmpnm=''
    this.updsal=''

    this.dataObj=new Employee()
    this.dataArr=[];
    this.getAllData()
  }

  getAllData(){
    this.service.getAllData().subscribe(res=>
      {
        this.dataArr=res
      },err=>
      {
        alert("Unable to get Data")
      })
  }

  addData(){
    this.dataObj.Emp_name=this.addName;
    this.dataObj.Emp_Email=this.addEmail
    this.dataObj.Cmp_name=this.addCmpName
    this.dataObj.salary=this.addSalary
    if(this.addName=== "" || this.addCmpName=== "" || this.addEmail=== "" || this.addSalary === ""){
      Swal.fire({
        title: "Empty",
        text: "Enter All field!!"
      });
    }
    else
    {

      this.service.addData(this.dataObj).subscribe(res=>{
        this.ngOnInit()
        this.addName='';
        this.addCmpName='';
        this.addEmail='';
        this.addSalary=''
      },err=>{
        alert(err)
      })
    }
  }

  calculatepf(){
      if(this.addSalary && this.pfRate)
      {
        return this.addSalary*this.pfRate;
      }
      else{
        return this.pfRate;
      }
  }

  DeleteData(d:Employee){
      this.service.DeleteData(d).subscribe(res=>
        {
          this.ngOnInit()
          Swal.fire("Employee Deleted...")
        },err=>{
          alert('Failed to delete data...')
        })
  }

  updateData(){
    this.dataObj.Emp_name=this.updnm;
    this.dataObj.Cmp_name=this.updcmpnm
    this.dataObj.Emp_Email=this.updEml
    this.dataObj.salary=this.updsal
  
    if(this.updsal && this.pfRate){
       return this.updsal * this.pfRate
    }
    else{
      return this.pfRate
    }

    this.service.EditData(this.dataObj).subscribe(res=>{
      this.ngOnInit()
    },err=>{
      alert('Failed to Update.')
    })
  }


  edit(data:Employee){
      this.dataObj=data
      this.updnm=data.Emp_name
      this.updcmpnm=data.Cmp_name
      this.updEml=data.Emp_Email
      this.updsal=data.salary
      }    
}
