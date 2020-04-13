import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaManutencaoComponent } from './lista-manutencao.component';

describe('ListaManutencaoComponent', () => {
  let component: ListaManutencaoComponent;
  let fixture: ComponentFixture<ListaManutencaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaManutencaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
