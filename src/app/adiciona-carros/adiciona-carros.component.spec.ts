import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionaCarrosComponent } from './adiciona-carros.component';

describe('AdicionaCarrosComponent', () => {
  let component: AdicionaCarrosComponent;
  let fixture: ComponentFixture<AdicionaCarrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionaCarrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionaCarrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
