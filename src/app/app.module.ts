import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { HttpModule }               from '@angular/http';

import { AppRoutingModule }         from './app-routing.module';

// imports for loading & configuring the in-memory api
import { InMemoryWebApiModule }     from 'angular-in-memory-web-api';
//import { InMemoryDataService }      from './in-memory-data.service';

import { TransaksiComponent }       from './transaksi.component';
import { TransaksiDetailComponent } from './transaksi-detail.component';
import { AntrianComponent }  from './antrian/antrian.component';
import { PasienFormComponent }   from './pasien/pasien-form.component';
import { AppComponent }             from './app.component';


@NgModule({
    imports:      [
      	BrowserModule,
      	FormsModule,
        AppRoutingModule,
        HttpModule
        //InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],
    declarations: [ 
        AppComponent,
        TransaksiComponent,
        PasienFormComponent,
        AntrianComponent,
        TransaksiDetailComponent 
    ],
    bootstrap:    [ 
	   AppComponent
    ]
})

export class AppModule { }
