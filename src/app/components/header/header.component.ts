import { Component, OnInit, Input } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showCreateForm?: boolean;
  subscription?: Subscription;

  get showErrorMessage() {
    return this.uiService.showErrorMessage;
  }

  get showSuccessMessage() {
    return this.uiService.showSuccessMessage;
  }

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showCreateForm = value));
  }

  ngOnInit(): void {}

  toggleCreateUser() {
    this.uiService.toggleCreateUser();
  }
}
