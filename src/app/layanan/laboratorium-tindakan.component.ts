import { Component, OnInit, Input }		from '@angular/core';

import { Laboratorium }         from './laboratorium';
import { LaboratoriumService }  from './laboratorium.service';

import { HasilLab }             from './hasil-lab';
import { HasilLabService }      from './hasil-lab.service';

import { Tindakan }             from './tindakan';
import { TindakanService }      from './tindakan.service';

@Component({
  selector: 'laboratorium-tindakan-page',
  templateUrl: './laboratorium-tindakan.component.html',
  providers: [
    LaboratoriumService,
    HasilLabService,
    TindakanService
  ]
})

export class LaboratoriumTindakanComponent implements OnInit {
  allLaboratorium: Laboratorium[] = [];
  allTindakan: Tindakan[] = [];
  selectedLaboratorium: Laboratorium = null;
  searchTerm: string = '';

  @Input()
  public alerts: Array<IAlert> = [];

  constructor (
    private laboratoriumService: LaboratoriumService,
    private hasilLabService: HasilLabService,
    private tindakanService: TindakanService
  ) {}

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  ngOnInit() {
    this.laboratoriumService.getAllLaboratorium().subscribe(
      data => this.allLaboratorium = data
    )
  }

  onEnter(event) {
    if (event.keyCode == 13) {
      this.search();
    }
  }

  search() {
    this.tindakanService.getTindakanWithoutHasilLab(this.selectedLaboratorium.nama, this.searchTerm)
      .subscribe(
        data => {
          if (data.length > 0) {
            this.allTindakan = data;
            this.alerts.pop();
          }
          else {
            this.allTindakan = [];
            this.alerts.pop();
            this.alerts.push({id: 1, type: 'warning', message: 'Tidak ada tindakan'});
          }
        }
      )
  }

  lakukanTindakan(tindakan: Tindakan) {
    let hasilLab = new HasilLab(
      null,
      tindakan.id_transaksi,
      tindakan.id,
      null
    );

    tindakan.np_tenaga_medis = JSON.parse(localStorage.getItem('currentUser')).no_pegawai;

    this.tindakanService.updateTindakan(tindakan).subscribe(
      data => {
        this.hasilLabService.createHasilLab(hasilLab).subscribe(
          data => {
            this.alerts.pop();
            this.alerts.push({id: 1, type: 'success', message: 'Tindakan sudah dilakukan, hasil lab dapat diupload pada halaman Home'});
            this.allTindakan.splice(this.allTindakan.indexOf(tindakan), 1);
          }
        )
      }
    );
  }
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
