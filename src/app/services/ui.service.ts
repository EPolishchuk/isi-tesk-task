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

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
