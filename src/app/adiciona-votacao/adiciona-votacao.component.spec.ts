import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionaVotacaoComponent } from './adiciona-votacao.component';

describe('AdicionaVotacaoComponent', () => {
  let component: AdicionaVotacaoComponent;
  let fixture: ComponentFixture<AdicionaVotacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionaVotacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionaVotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
