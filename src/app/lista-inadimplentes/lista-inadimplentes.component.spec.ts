import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInadimplentesComponent } from './lista-inadimplentes.component';

describe('ListaInadimplentesComponent', () => {
  let component: ListaInadimplentesComponent;
  let fixture: ComponentFixture<ListaInadimplentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaInadimplentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaInadimplentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
