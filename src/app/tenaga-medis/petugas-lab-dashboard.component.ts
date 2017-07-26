import { Component, OnInit }		  from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }							  from '@angular/common';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';

import { TenagaMedis }            from './tenaga-medis';
import { TenagaMedisService }     from './tenaga-medis.service';

import { Laboratorium }           from '../layanan/laboratorium';
import { LaboratoriumService }    from '../layanan/laboratorium.service';

import { Tindakan }               from '../layanan/tindakan';
import { TindakanService }        from '../layanan/tindakan.service';

import { HasilLab }               from '../layanan/hasil-lab';
import { HasilLabService }        from '../layanan/hasil-lab.service';

import { ENV }										from '../environment';

@Component({
  selector: 'petugas-lab-dashboard-page',
  templateUrl: './petugas-lab-dashboard.component.html',
  providers: [
    TindakanService,
    TenagaMedisService,
    LaboratoriumService,
    HasilLabService
  ]
})

export class PetugasLabDashboardComponent implements OnInit {
	private hasilLabUrl = ENV.hasilLabUrl;

  tenagaMedis: TenagaMedis = null;

  allLaboratorium: Laboratorium[] = [];
  allTindakan: Tindakan[] = [];

  selectedLaboratorium: Laboratorium = null;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private tindakanService: TindakanService,
    private tenagaMedisService: TenagaMedisService,
		private laboratoriumService: LaboratoriumService,
    private hasilLabService: HasilLabService
	) {}

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.tenagaMedisService.getTenagaMedis(params['noPegawai']))
      .subscribe(
        tenagaMedis => {
          this.tenagaMedis = tenagaMedis;
          this.tindakanService.getTindakanWithoutHasilLab(this.tenagaMedis.no_pegawai).subscribe(
            data => this.allTindakan = data
          )
        }
      );

    this.laboratoriumService.getAllLaboratorium().subscribe(
      data => { this.allLaboratorium = data }
    );
  }

  upload(event: any, id_transaksi: number, id_tindakan: number) {
    this.hasilLabService.createHasilLab(event, id_transaksi, id_tindakan).subscribe(
      data => this.ngOnInit()
    );
  }
}
