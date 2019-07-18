import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeicleComponent } from './veicle.component';

describe('VeicleComponent', () => {
  let component: VeicleComponent;
  let fixture: ComponentFixture<VeicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
