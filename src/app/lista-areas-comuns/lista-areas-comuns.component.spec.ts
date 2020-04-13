import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAreasComunsComponent } from './lista-areas-comuns.component';

describe('ListaAreasComunsComponent', () => {
  let component: ListaAreasComunsComponent;
  let fixture: ComponentFixture<ListaAreasComunsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAreasComunsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAreasComunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
