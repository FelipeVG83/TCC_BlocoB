import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionaNotificacaoComponent } from './adiciona-notificacao.component';

describe('AdicionaNotificacaoComponent', () => {
  let component: AdicionaNotificacaoComponent;
  let fixture: ComponentFixture<AdicionaNotificacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionaNotificacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionaNotificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
