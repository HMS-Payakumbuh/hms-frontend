import { Component, OnInit, Input }		from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

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

  constructor (
    private laboratoriumService: LaboratoriumService,
    private hasilLabService: HasilLabService,
    private tindakanService: TindakanService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {}

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
    this.tindakanService.getTindakanWithoutHasilLab(this.selectedLaboratorium.nama)
      .subscribe(
        data => {
          if (data.length > 0) {
            this.allTindakan = data;

            let toastOptions:ToastOptions = {
                title: 'Success',
                msg: 'Terdapat ' + data.length + ' tindakan yang perlu diproses',
                showClose: true,
                timeout: 5000,
                theme: 'material'
            };

            this.toastyService.success(toastOptions);
          }
          else {
            this.allTindakan = [];
            let toastOptions:ToastOptions = {
                title: 'Warning',
                msg: 'Tidak ada tindakan yang perlu diproses',
                showClose: true,
                timeout: 5000,
                theme: 'material'
            };

            this.toastyService.warning(toastOptions);
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
            let toastOptions:ToastOptions = {
                title: 'Success',
                msg: 'Tindakan sudah dilakukan, hasil lab dapat diupload pada halaman Home',
                showClose: true,
                timeout: 5000,
                theme: 'material'
            };

            this.toastyService.success(toastOptions);
            this.allTindakan.splice(this.allTindakan.indexOf(tindakan), 1);
          }
        )
      }
    );
  }
}
