import { Component, OnInit } from '@angular/core';
import  User  from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public userForm: FormGroup;
  user: User = new User();
  submitted = false;

  constructor(private service: UserService,
    public formBuilder: FormBuilder,
    public router: Router
    ) {
      this.userForm = this.formBuilder.group({
        name: ['',Validators.required],
        email: ['',[Validators.required, Validators.email]],
        mobile: ['',[Validators.required, Validators.minLength(10)]],
        birth_date: ['',Validators.required],
        salary:['',Validators.required]
      }) 
     }

  ngOnInit(): void {
  }

  saveUser(): void {
    this.service.createUser(this.userForm.value);
    this.router.navigate(['users']);
  }

  newuser(): void {
    this.submitted = false;
    this.user = new User();
  }
}
