import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  academicYears:string[]=["First","Second","Pre-final","Final"];
  studentForm!:FormGroup;
  actionBtn:string="Save";

  constructor(private formBuilder:FormBuilder,private api:ApiService,
    private dialogRef:MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData:any){ }

  ngOnInit():void{
    this.studentForm=this.formBuilder.group({
      studentName:['',Validators.required],
      dateOfBirth:['',Validators.required],
      branch:['',Validators.required],
      year:['',Validators.required],
      studentId:['',Validators.required],
      interests:['',Validators.required]
    })
    console.log(this.editData);

    if(this.editData){
      this.actionBtn="Update";
      this.studentForm.controls['studentName'].setValue(this.editData.studentName);
      this.studentForm.controls['dateOfBirth'].setValue(this.editData.dateOfBirth);
      this.studentForm.controls['branch'].setValue(this.editData.branch);
      this.studentForm.controls['year'].setValue(this.editData.year);
      this.studentForm.controls['studentId'].setValue(this.editData.studentId);
      this.studentForm.controls['interests'].setValue(this.editData.interests);
    }
    
  }

  addStudent(){
   if(!this.editData){
    if(this.studentForm.valid){
      this.api.postProduct(this.studentForm.value).subscribe({
        next:(res)=>{
          alert("Details added successfully");
          this.studentForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error while adding details")
        }
      })
    }
   }else{
    this.updateStudent()
   }
    
  }
  updateStudent(){
    this.api.putStudent(this.studentForm.value,this.editData.id).subscribe({
      next:(res)=>{
        alert("Student data updated successfully");
        this.studentForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while adding details")
      }
    })
  }
}
