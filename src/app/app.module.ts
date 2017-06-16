import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { ReactiveFormsModule }      from '@angular/forms';
import { HttpModule }               from '@angular/http';


// imports for loading & configuring the in-memory api
//import { InMemoryWebApiModule }     from 'angular-in-memory-web-api';
//import { InMemoryDataService }      from './in-memory-data.service';
import { AppRoutingModule }         from './app-routing.module';
import { TransaksiComponent }       from './transaksi.component';
import { TransaksiDetailComponent } from './transaksi-detail.component';
import { AntrianComponent }  from './antrian/antrian.component';
import { PasienFormComponent }      from './pasien/pasien-form.component';
import { RawatJalanComponent }      from './rawat-jalan.component';
import { AppComponent }             from './app.component';


@NgModule({
    imports:      [
      	BrowserModule,
      	FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpModule
        //InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],
    declarations: [ 
        AppComponent,
        TransaksiComponent,
        PasienFormComponent,
        AntrianComponent,
        TransaksiDetailComponent, 
        RawatJalanComponent 
    ],
    bootstrap:    [ 
	   AppComponent
    ]
})

export class AppModule { }
