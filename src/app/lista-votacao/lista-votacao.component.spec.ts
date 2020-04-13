import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVotacaoComponent } from './lista-votacao.component';

describe('ListaVotacaoComponent', () => {
  let component: ListaVotacaoComponent;
  let fixture: ComponentFixture<ListaVotacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaVotacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaVotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
