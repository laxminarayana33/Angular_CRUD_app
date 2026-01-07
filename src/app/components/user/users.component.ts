import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  standalone:true,
})
export class UsersComponent implements OnInit{

  users:User[] = [];
  user:User = {
    name:'',
    email:'',
    phone:'',
    gender:''
  }
  isEdit = false;

  constructor(private userService:UserService){

  }

  ngOnInit(): void {
      this.loadUsers();
  };

  loadUsers(){
    this.userService.getUsers().subscribe((data)=>{
      this.users = data;
    });
  };

  saveUser(){
    if(this.isEdit){
      this.userService.updateUser(this.user).subscribe(()=>{
        this.resetForm();
        this.loadUsers();
      });
    }else{
      this.userService.addUser(this.user).subscribe(()=>{
        this.loadUsers();
        this.resetForm();
      });
    }
  };

  editUser(user:User){
    this.user = {...user};
    this.isEdit = true;
  };

  deleteUser(id:number){
    this.userService.deleteUser(id).subscribe(()=>{
      this.loadUsers();
    })
  };

  resetForm(){
    this.user = {id:0, name:'', email:'', phone:'', gender:''};
    this.isEdit = false;
  }

}
