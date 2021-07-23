import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
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
    console.log(this.formFields);
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentUser && changes.currentUser.currentValue === undefined) {
      this.formFields.reset();
    }
    if (changes.currentUser && changes.currentUser.currentValue) {
      this.formFields.setValue({
        username: this.currentUser?.username,
        firstName: this.currentUser?.firstName,
        lastName: this.currentUser?.lastName,
        email: this.currentUser?.email,
        type: this.currentUser?.type,
        password: this.currentUser?.password || null,
        confirmPassword: this.currentUser?.password || null,
      });
    }
  }

}
