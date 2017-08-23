import { Component, OnInit }		  from '@angular/core';
import { Headers, Http, Response, RequestOptions }		from '@angular/http';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

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
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "nama_pasien";
  public sortOrder = "asc";

	private hasilLabUrl = ENV.hasilLabUrl;

  searchTerm: string = '';
  tenagaMedis: TenagaMedis = null;
  allHasilLab: HasilLab[] = [];
  allEmptyHasilLab: HasilLab[] = [];
  allLaboratorium: Laboratorium[] = [];

  selectedLaboratorium: Laboratorium = null;
  hasilLabMap: Map<number, any> = new Map();
  hasilLabId: number = null;

  constructor(
    private tindakanService: TindakanService,
    private tenagaMedisService: TenagaMedisService,
		private laboratoriumService: LaboratoriumService,
    private hasilLabService: HasilLabService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
	) {}

  ngOnInit() {
    let noPegawai: string = JSON.parse(localStorage.getItem('currentUser')).no_pegawai;
    this.tenagaMedisService.getTenagaMedis(noPegawai).subscribe(
      tenagaMedis => {
        this.tenagaMedis = tenagaMedis;
        this.hasilLabService.getEmptyHasilLab(this.tenagaMedis.no_pegawai).subscribe(
          data => this.allEmptyHasilLab = data
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
      data => {
        this.allHasilLab = data
      }
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

  onChange(event: any, id: number) {
    this.hasilLabMap.set(id, event);
  }

  showUploadModal(id: number) {
    this.hasilLabId = id;
  }

  uploadHasilLab(event: any, id: number) {
    this.hasilLabService.uploadHasilLab(event, id).subscribe(
      data => {
        this.ngOnInit();
        let toastOptions:ToastOptions = {
            title: 'Success',
            msg: 'Upload hasil lab berhasil',
            showClose: true,
            timeout: 5000,
            theme: 'material'
        };

        this.toastyService.success(toastOptions);
      },
      error => {
        let toastOptions:ToastOptions = {
            title: 'Error',
            msg: 'Upload hasil lab gagal',
            showClose: true,
            timeout: 5000,
            theme: 'material'
        };

        this.toastyService.error(toastOptions);
      }
    );
  }
}
