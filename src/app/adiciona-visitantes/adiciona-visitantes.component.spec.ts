import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionaVisitantesComponent } from './adiciona-visitantes.component';

describe('AdicionaMoradoresComponent', () => {
	let component: AdicionaVisitantesComponent;
	let fixture: ComponentFixture<AdicionaVisitantesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AdicionaVisitantesComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AdicionaVisitantesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
