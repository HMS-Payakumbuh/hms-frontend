import { Component, OnInit }		  from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }							  from '@angular/common';

import { TenagaMedis }            from './tenaga-medis';
import { TenagaMedisService }     from './tenaga-medis.service';

import { Laboratorium }           from '../layanan/laboratorium';
import { LaboratoriumService }    from '../layanan/laboratorium.service';

import { HasilLab }               from '../layanan/hasil-lab';
import { HasilLabService }        from '../layanan/hasil-lab.service';

@Component({
  selector: 'petugas-lab-dashboard-page',
  templateUrl: './petugas-lab-dashboard.component.html',
  providers: [
    TenagaMedisService,
    LaboratoriumService,
    HasilLabService
  ]
})

export class PetugasLabDashboardComponent implements OnInit {
  tenagaMedis: TenagaMedis = null;

  allLaboratorium: Laboratorium[] = [];
  allHasilLab: HasilLab[] = [];

  selectedLaboratorium: Laboratorium = null;

  constructor(
    private route: ActivatedRoute,
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
          this.hasilLabService.getEmptyHasilLab(this.tenagaMedis.no_pegawai).subscribe(
            data => { this.allHasilLab = data }
          )
        }
      );

    this.laboratoriumService.getAllLaboratorium().subscribe(
      data => { this.allLaboratorium = data }
    );
  }
}
