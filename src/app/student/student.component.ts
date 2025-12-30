import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Istd } from '../models/studentArr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  isinEDitMode: boolean =false
  editId!:string
 
   @ViewChild('fname')fname!:ElementRef;
   @ViewChild('lName')lName!:ElementRef;
   @ViewChild('email')email!:ElementRef;
   @ViewChild('contact')contact!:ElementRef;
  stdArr:Array<Istd> =[
    {
   fName : 'Jhon',
   lName : 'Doe',
   email : 'jd@gmail.com',
   contact : '123456789',
   stdId : '123'

  },
   {
   fName : 'May',
   lName : 'Doe',
   email : 'md@gmail.com',
   contact : '1234567153',
   stdId:'1234'
  }
]
  constructor(private _matDialog : MatDialog,
    private _snakbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }


trackByStdId(index: number, std:Istd) {
  return std.stdId;
}
onAddStd(){
  if(this.fname.nativeElement.value && this.lName.nativeElement.value && this.email.nativeElement.value && this.contact.nativeElement.value){
 let stdObj : Istd={
 fName: this.fname.nativeElement.value,
 lName: this.lName.nativeElement.value,
 email: this.email.nativeElement.value,
 contact: this.contact.nativeElement.value,
 stdId:this.uuid()
  }
  this.stdArr.unshift(stdObj);
    this.fname.nativeElement.value = '';
    this.lName.nativeElement.value = '';
    this.email.nativeElement.value = '';
    this.contact.nativeElement.value = '';

     this._snakbar.open(`Student with name ${stdObj.fName} ${stdObj.lName } Successfuly!!` , "close", {
      horizontalPosition :'center',
      verticalPosition:'top',
      duration:2000
    })
  }
}

onEdit(std:Istd){
   this.editId = std.stdId
   this.fname.nativeElement.value =std.fName
   this.lName.nativeElement.value =std.lName
   this.email.nativeElement.value =std.email
   this.contact.nativeElement.value =std.contact
   this.isinEDitMode=true
}

onUpdate(){

  console.log('updated')
  let UPDATED_OBJECT={
    fName: this.fname.nativeElement.value,
 lName: this.lName.nativeElement.value,
 email: this.email.nativeElement.value,
 contact: this.contact.nativeElement.value,
 stdId:this.editId
  }

   let GET_INDEX = this.stdArr.findIndex(student=>student.stdId === this.editId)
   this.stdArr[GET_INDEX]= UPDATED_OBJECT
   this.isinEDitMode=false

    this.fname.nativeElement.value = '';
    this.lName.nativeElement.value = '';
    this.email.nativeElement.value = '';
    this.contact.nativeElement.value = '';
    this._snakbar.open(`Student with id ${this.editId} Updated Successfuly!!` , "close", {
      horizontalPosition :'center',
      verticalPosition:'top',
      duration:2000
    })

}

onRemove(stdId:string){
  let matConfig = new MatDialogConfig()
  matConfig.disableClose=true
 let matDailogRef= this._matDialog.open(GetConfirmComponent, matConfig)
 matDailogRef.afterClosed()
 .subscribe(data =>{
  if(data){
     
  let REMOVE_ID = stdId;
  let GET_INDEX = this.stdArr.findIndex(s=>s.stdId === REMOVE_ID);
  this.stdArr.splice(GET_INDEX,1)
   this._snakbar.open(`this student with id ${stdId} removed successfully` , "close" ,{
    horizontalPosition:'center',
    verticalPosition:'top',
    duration:2000
  })
  }

 })
  

}
uuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;
        return value.toString(16);
    });
};




}
