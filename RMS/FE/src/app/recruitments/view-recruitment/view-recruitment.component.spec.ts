import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecruitmentComponent } from './view-recruitment.component';

describe('ViewRecruitmentComponent', () => {
  let component: ViewRecruitmentComponent;
  let fixture: ComponentFixture<ViewRecruitmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRecruitmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRecruitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
