import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFieldsFormComponent } from './user-fields-form.component';

describe('UserFieldsFormComponent', () => {
  let component: UserFieldsFormComponent;
  let fixture: ComponentFixture<UserFieldsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFieldsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFieldsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
