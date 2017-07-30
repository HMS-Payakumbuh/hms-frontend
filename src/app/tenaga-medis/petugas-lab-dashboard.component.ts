import { Component, OnInit, Input }		  from '@angular/core';
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
  @Input()
  public alerts: Array<IAlert> = [];

  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "nama_pasien";
  public sortOrder = "asc";

	private hasilLabUrl = ENV.hasilLabUrl;

  searchTerm: string = '';
  tenagaMedis: TenagaMedis = null;
  allHasilLab: HasilLab[] = [];
  allLaboratorium: Laboratorium[] = [];
  allTindakan: Tindakan[] = [];

  selectedLaboratorium: Laboratorium = null;

  constructor(
    private tindakanService: TindakanService,
    private tenagaMedisService: TenagaMedisService,
		private laboratoriumService: LaboratoriumService,
    private hasilLabService: HasilLabService
	) {}

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  ngOnInit() {
    let noPegawai: string = JSON.parse(localStorage.getItem('currentUser')).no_pegawai;
    this.tenagaMedisService.getTenagaMedis(noPegawai).subscribe(
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

  onEnter(event) {
    if (event.keyCode == 13) {
      this.searchHasilLab();
    }
  }

  searchHasilLab() {
    this.hasilLabService.getHasilLab(this.searchTerm).subscribe(
      data => this.allHasilLab = data
    )
  }

  downloadHasilLab(id: number) {
    this.hasilLabService.downloadHasilLab(id).subscribe(
      data => {
        let url = window.URL.createObjectURL(data);
        window.location.assign(url);
      }
    )
  }

  uploadHasilLab(event: any, id_transaksi: number, id_tindakan: number) {
    this.hasilLabService.createHasilLab(event, id_transaksi, id_tindakan).subscribe(
      data => {
        this.ngOnInit();
        this.alerts.pop();
        this.alerts.push({id: 1, type: 'success', message: 'Upload berhasil'});
      },
      error => {
        this.alerts.pop();
        this.alerts.push({id: 1, type: 'warning', message: 'Upload gagal'});
      }
    );
  }
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
