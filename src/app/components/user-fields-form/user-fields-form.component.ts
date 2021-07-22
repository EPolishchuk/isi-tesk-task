import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/Users';

enum Type {
  Administrator = 'administrator',
  Driver = 'driver',
}

@Component({
  selector: 'app-user-fields-form',
  templateUrl: './user-fields-form.component.html',
  styleUrls: ['./user-fields-form.component.css'],
})
export class UserFieldsFormComponent implements OnInit {
  @Input() currentUser?: User;
  @Input() formFields!: FormGroup;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  type?: Type;
  password?: string;
  confirmPassword?: string;

  constructor() {}

  ngOnInit(): void {
    console.log('this is form: ', this.currentUser);
    console.log('this is form: ', this.username);
    this.username = this.currentUser?.username;
  }
}
