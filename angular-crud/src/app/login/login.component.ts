import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isEmailRight: boolean = false;

  constructor(private dialogRef:MatDialogRef<LoginComponent>,private api:ApiService,
    private snackBar: MatSnackBar){}

  // login() {
  //   if (this.email === 'test@test.com' && this.password === 'test') {
  //     alert('Login successful!');
  //     this.isEmailRight = true;
  //     console.log(this.isEmailRight);
  //     this.dialogRef.close('login');
  //   } else {
  //     alert('Invalid email or password');
  //   }
  // }
  login(){
    if (!this.email || !this.password) {
      this.snackBar.open('Please provide both email and password.', 'Close', { duration: 2000 });
      return;
    }

    const data = { email: this.email, password: this.password };
    this.api.loginValidate(data).subscribe((res)=>{
      if(res.message==='Login successful'){
        this.snackBar.open('Login successful!', 'Close', {
          duration: 2000, 
        });
        this.isEmailRight=true;
        this.dialogRef.close('login');
      }else{
        this.snackBar.open('Invalid email or password', 'Close', {
          duration: 2000, });
      }
      
    },
    (error)=>{
      this.snackBar.open('Invalid email or password', 'Close', {
        duration: 2000, });
      console.log(error);
      
    }
    );
  }
}
