import { NgModule }      		from '@angular/core';
import { BrowserModule } 		from '@angular/platform-browser';
import { FormsModule }	 		from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { TransaksiComponent }   from './transaksi.component';
import { PasienFormComponent }   from './pasien/pasien-form.component';
import { AppComponent }         from './app.component';

import { AppRoutingModule }     from './app-routing.module'

@NgModule({
    imports:      [
      	BrowserModule,
      	FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [ 
        AppComponent,
        TransaksiComponent,
        PasienFormComponent 
    ],
    bootstrap:    [ 
	   AppComponent
    ]
})

export class AppModule { }
