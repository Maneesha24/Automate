import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomateFolderComponent } from './automate-folder.component';

describe('AutomateFolderComponent', () => {
  let component: AutomateFolderComponent;
  let fixture: ComponentFixture<AutomateFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomateFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomateFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
