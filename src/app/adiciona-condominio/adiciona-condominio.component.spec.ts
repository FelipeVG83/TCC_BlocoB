import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionaCondominioComponent } from './adiciona-condominio.component';

describe('AdicionaCondominioComponent', () => {
  let component: AdicionaCondominioComponent;
  let fixture: ComponentFixture<AdicionaCondominioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionaCondominioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionaCondominioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
