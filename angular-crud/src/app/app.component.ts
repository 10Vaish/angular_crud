import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

import { LoginComponent } from './login/login.component';
import { ApiService } from './services/api.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-material';
  displayedColumns: string[] = ['sname', 'dob', 'sbranch', 'syear','sid','data','action'];
  dataSource!: MatTableDataSource<any>;
  isEmailRight:boolean=false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,
    private api:ApiService,
  private route:Router){

  }
  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllProducts();
      }
    })
  }
  openLogin(){
    const isLogin=this.dialog.open(LoginComponent,{
      width:'30%',
      data: { isEmailRight: this.isEmailRight }
    });
    isLogin.afterClosed().subscribe(val=>{
    if(val==='login'){
      // this.api.blockMessage=true;
      // this.route.navigate(['/home'],{replaceUrl:true});
      this.isEmailRight=true;
      this.api.isLogin=true;
    }
    })  
  }
  login() {
    throw new Error('Method not implemented.');
  }

  getAllProducts(){
    this.api.getProduct().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
        
      },
      error:(err)=>{
        alert(err);
        
      }

    })

  }

  editDetails(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row

    }).afterClosed().subscribe(val=>{
      if (val==='update') {
        this.getAllProducts();        
      }
    })
  }
  deleteStudent(id:number){
    this.api.deleteStudent(id).subscribe({
      next:(res)=>{
        alert('Student deleted successfully');
        this.getAllProducts();
      },
      error:()=>{
        alert('Error while deleting the student');
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
