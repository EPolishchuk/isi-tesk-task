import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';
import { UserService } from '../../services/user.service';
import { User } from '../../Users';

enum mode {
  add,
  edit,
  view,
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  currentUser?: User;
  uiMode: mode = mode.view;
  subscription?: Subscription;

  userData: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    type: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  get user() {
    return {
      username: this.userData.get('username'),
      firstName: this.userData.get('firstName'),
      lastName: this.userData.get('lastName'),
      email: this.userData.get('email'),
      type: this.userData.get('type'),
      password: this.userData.get('password'),
      confirmPassword: this.userData.get('confirmPassword'),
    };
  }

  constructor(private userService: UserService, private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((value) => {
      console.log(value);
      if ('create' in value) {
        this.uiMode = value.create ? 0 : 2;
      } else if ('update' in value) {
        this.uiMode = value.update ? 1 : 2;
      }
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  updateForm(user: User, index: number): void {
    this.uiService.toggleUpdateUser();
    this.currentUser = user;
    console.log('this is list: ', user, index);
  }

  onSubmit() {
    console.log(this.user);
  }
}
