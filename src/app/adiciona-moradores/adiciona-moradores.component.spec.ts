import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionaMoradoresComponent } from './adiciona-moradores.component';

describe('AdicionaMoradoresComponent', () => {
  let component: AdicionaMoradoresComponent;
  let fixture: ComponentFixture<AdicionaMoradoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionaMoradoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionaMoradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
