import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Student } from '../../../models/student.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  public studentsArray:Student[] =[];

  public UserName:string = "John";
  public  MobileNumber:number = 9090989890;
  public email:string = "John@gmail.com";
  public address:string = "!-1-2, gachibowli, Hyderabad";

  public addAddressClick(){
 
  }

  public updateInfoClick(){
    
  }
}
