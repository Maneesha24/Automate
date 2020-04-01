import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomateInputComponent } from './automate-input.component';

describe('AutomateInputComponent', () => {
  let component: AutomateInputComponent;
  let fixture: ComponentFixture<AutomateInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomateInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
