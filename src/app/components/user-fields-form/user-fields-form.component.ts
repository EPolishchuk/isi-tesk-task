import { Component, OnInit } from '@angular/core';

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
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  type?: Type;
  password?: string;
  confirmPassword?: string;

  constructor() {}

  ngOnInit(): void {}
}
