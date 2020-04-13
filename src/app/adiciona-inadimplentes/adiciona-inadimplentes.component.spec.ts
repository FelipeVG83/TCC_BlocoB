import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionaInadimplentesComponent } from './adiciona-inadimplentes.component';

describe('AdicionaInadimplentesComponent', () => {
  let component: AdicionaInadimplentesComponent;
  let fixture: ComponentFixture<AdicionaInadimplentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionaInadimplentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionaInadimplentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
