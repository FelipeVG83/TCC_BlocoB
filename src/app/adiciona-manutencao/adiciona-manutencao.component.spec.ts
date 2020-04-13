import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionaManutencaoComponent } from './adiciona-manutencao.component';

describe('AdicionaManutencaoComponent', () => {
  let component: AdicionaManutencaoComponent;
  let fixture: ComponentFixture<AdicionaManutencaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionaManutencaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionaManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
