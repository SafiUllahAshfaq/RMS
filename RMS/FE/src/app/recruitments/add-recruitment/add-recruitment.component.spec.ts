import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecruitmentComponent } from './add-recruitment.component';

describe('AddRecruitmentComponent', () => {
  let component: AddRecruitmentComponent;
  let fixture: ComponentFixture<AddRecruitmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRecruitmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecruitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
