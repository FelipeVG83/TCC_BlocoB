import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMoradoresComponent } from './lista-moradores.component';

describe('ListaMoradoresComponent', () => {
  let component: ListaMoradoresComponent;
  let fixture: ComponentFixture<ListaMoradoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaMoradoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMoradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
