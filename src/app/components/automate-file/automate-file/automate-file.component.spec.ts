import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomateFileComponent } from './automate-file.component';

describe('AutomateFileComponent', () => {
  let component: AutomateFileComponent;
  let fixture: ComponentFixture<AutomateFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomateFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomateFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
