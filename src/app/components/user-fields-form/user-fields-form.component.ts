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
    if (this.currentUser) {
      this.formFields.setValue({
        username: this.currentUser?.username,
        firstName: this.currentUser?.firstName,
        lastName: this.currentUser?.lastName,
        email: this.currentUser?.email,
        type: this.currentUser?.type,
        password: this.currentUser?.password || null,
        confirmPassword: this.currentUser?.password || null,
      });
    } else {
      this.formFields.reset();
    }
  }
}
