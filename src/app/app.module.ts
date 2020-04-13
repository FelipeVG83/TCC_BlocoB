import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdicionaMoradoresComponent } from './adiciona-moradores/adiciona-moradores.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { TopperComponent } from './topper/topper.component';

import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from './material-modules';
import { AdicionaCarrosComponent } from './adiciona-carros/adiciona-carros.component';
import { HttpClientModule } from '@angular/common/http';
import { CalendarioComponent } from './calendario/calendario.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { FileUploadModule } from 'ng2-file-upload';
import { ChartsModule } from 'ng2-charts';

import { environment } from '../environments/environment';
import { AdicionaVotacaoComponent } from './adiciona-votacao/adiciona-votacao.component';
import { NotifierModule } from 'angular-notifier';
import { AdicionaAreasComunsComponent } from './adiciona-areas-comuns/adiciona-areas-comuns.component';
import { AdicionaCondominioComponent } from './adiciona-condominio/adiciona-condominio.component';
import { AdicionaNotificacaoComponent } from './adiciona-notificacao/adiciona-notificacao.component';
import { ListaNotificacaoComponent } from './lista-notificacao/lista-notificacao.component';
import { ListaMoradoresComponent } from './lista-moradores/lista-moradores.component';
import { ListaVotacaoComponent } from './lista-votacao/lista-votacao.component';
import { ListaCarrosComponent } from './lista-carros/lista-carros.component';
import { NgbDateFRParserFormatterService } from './services/ngb-date-frparser-formatter.service';
import { ListaAreasComunsComponent } from './lista-areas-comuns/lista-areas-comuns.component';
import { AdicionaInadimplentesComponent } from './adiciona-inadimplentes/adiciona-inadimplentes.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ListaInadimplentesComponent } from './lista-inadimplentes/lista-inadimplentes.component';
import { AdicionaManutencaoComponent } from './adiciona-manutencao/adiciona-manutencao.component';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { ListaManutencaoComponent } from './lista-manutencao/lista-manutencao.component';
import { AdicionaVisitantesComponent } from './adiciona-visitantes/adiciona-visitantes.component';
import { ListaVisitantesComponent } from './lista-visitantes/lista-visitantes.component';
import { FinanceiroComponent } from './financeiro/financeiro.component';

export let options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
	declarations: [
		AppComponent,
		AdicionaMoradoresComponent,
		DashboardComponent,
		MenuComponent,
		TopperComponent,
		AdicionaCarrosComponent,
		CalendarioComponent,
		AdicionaVotacaoComponent,
		AdicionaAreasComunsComponent,
		AdicionaCondominioComponent,
		AdicionaNotificacaoComponent,
		ListaNotificacaoComponent,
		ListaMoradoresComponent,
		ListaVotacaoComponent,
		ListaCarrosComponent,
		ListaAreasComunsComponent,
		AdicionaInadimplentesComponent,
		LoginComponent,
		MainComponent,
		ListaInadimplentesComponent,
		AdicionaManutencaoComponent,
		ListaManutencaoComponent,
		AdicionaVisitantesComponent,
		ListaVisitantesComponent,
		FinanceiroComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		CommonModule,
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		DemoMaterialModule,
		NgbModule,
		HttpClientModule,
		FullCalendarModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireDatabaseModule,
		AngularFireStorageModule,
		FileUploadModule,
		ChartsModule,
		NotifierModule.withConfig({
			position: {
				horizontal: {
					position: 'right',
					distance: 12
				},
				vertical: {
					position: 'top',
				}
			}
		}
		),
		NgxMaskModule.forRoot(options)

	],
	exports: [
		DemoMaterialModule
	],
	providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatterService }],
	bootstrap: [AppComponent]
})
export class AppModule { }
