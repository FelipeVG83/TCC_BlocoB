import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionaAreasComunsComponent } from './adiciona-areas-comuns.component';

describe('AdicionaAreasComunsComponent', () => {
  let component: AdicionaAreasComunsComponent;
  let fixture: ComponentFixture<AdicionaAreasComunsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionaAreasComunsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionaAreasComunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
