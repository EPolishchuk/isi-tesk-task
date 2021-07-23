import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
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
    password: new FormControl('',
    Validators.compose([Validators.required, this.passwordPatternValidator()])),
    confirmPassword: new FormControl('', Validators.required),
  });

  passwordPatternValidator(): ValidatorFn {
    return (passwordControl: AbstractControl): ValidationErrors | null => {
      if (!passwordControl.value) {
        return { emptyPassword: true };
      }
      const leterAndDigit = /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/;
      const valid = leterAndDigit.test(passwordControl.value);
      return valid ? null : { invalidPassword: true };
    };
  }

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

  get showErrorMessage() {
    return this.uiService.showErrorMessage;
  }

  get showSuccessMessage() {
    return this.uiService.showSuccessMessage;
  }

  constructor(private userService: UserService, private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((value) => {
      if ('create' in value) {
        if (value.create) this.currentUser = undefined;
        this.uiMode = value.create ? 0 : 2;
      } else if ('update' in value) {
        this.uiMode = value.update ? 1 : 2;
      }
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  updateForm(user: User): void {    
    if (this.currentUser === undefined) {
      this.currentUser = user;
    }
    if (this.currentUser?.id === user.id) {
      this.uiService.toggleUpdateUser();
    } else {
      this.currentUser = user;
    }
  }

  onSubmit() {
    if (this.userData.valid) {
      let newUser: User = {
        id: this.user?.type?.value + this.user?.firstName?.value,
        username: this.user?.username?.value,
        firstName: this.user?.firstName?.value,
        lastName: this.user?.lastName?.value,
        email: this.user?.email?.value,
        type: this.user?.type?.value,
        password: this.user?.password?.value,
      };

      this.userService
        .addUser(newUser)
        .subscribe((user) => this.users.push(user));

      this.uiService.toggleSuccessMessage();

      setTimeout(() => {
        this.uiService.toggleSuccessMessage();
      }, 2000);  
    }
  }

  delete(user?: User) {
    if (user) {
      this.userService
        .deleteUser(user)
        .subscribe(
          () => {
            (this.users = this.users.filter((deletedUser) => deletedUser.id !== user.id)); 
            this.uiService.toggleUpdateUser();
          }
        );

        this.uiService.toggleSuccessMessage();

        setTimeout(() => {
          this.uiService.toggleSuccessMessage();
        }, 2000);  
    }
  }

  save(user?: User) {
    let updatedUser: User = {
      id: user?.id || this.user?.type?.value + this.user?.firstName?.value,
      username: this.user?.username?.value,
      firstName: this.user?.firstName?.value,
      lastName: this.user?.lastName?.value,
      email: this.user?.email?.value,
      type: this.user?.type?.value,
      password: this.user?.password?.value,
    };
    if (updatedUser) {
      this.userService
        .updateUser(updatedUser)
        .subscribe(
          () => {
            const userIndex = this.users.findIndex((el) => el.id === updatedUser.id);
            this.users[userIndex] = updatedUser;
          }
        );

        this.uiService.toggleSuccessMessage();

        setTimeout(() => {
          this.uiService.toggleSuccessMessage();
        }, 2000);  
    }
  }
}
