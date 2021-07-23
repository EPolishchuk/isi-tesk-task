import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface FormType {
  create?: boolean;
  update?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UiService {
  showCreateUser: FormType = { create: false };
  showUpdateUser: FormType = { update: false };
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  private subject = new Subject<any>();

  constructor() {}

  toggleCreateUser(): void {
    this.showCreateUser.create = !this.showCreateUser.create;
    this.showUpdateUser.update = false;
    this.subject.next(this.showCreateUser);
  }

  toggleUpdateUser(): void {
    this.showUpdateUser.update = !this.showUpdateUser.update;
    this.showCreateUser.create = false;
    this.subject.next(this.showUpdateUser);
  }

  toggleSuccessMessage(): void {
    this.showSuccessMessage = !this.showSuccessMessage;
    this.subject.next(this.showSuccessMessage);
  }

  toggleErrorMessage(): void {
    this.showErrorMessage = !this.showErrorMessage;
    this.subject.next(this.showErrorMessage);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
