import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfleComponent } from './update-profle.component';

describe('UpdateProfleComponent', () => {
  let component: UpdateProfleComponent;
  let fixture: ComponentFixture<UpdateProfleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProfleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
