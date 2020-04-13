import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaNotificacaoComponent } from './lista-notificacao.component';

describe('ListaNotificacaoComponent', () => {
  let component: ListaNotificacaoComponent;
  let fixture: ComponentFixture<ListaNotificacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaNotificacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaNotificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
