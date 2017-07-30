import { Component, OnInit, Input }		from '@angular/core';

import { Laboratorium }         from './laboratorium';
import { LaboratoriumService }  from './laboratorium.service';

import { Tindakan }             from './tindakan';
import { TindakanService }      from './tindakan.service';

@Component({
  selector: 'laboratorium-tindakan-page',
  templateUrl: './laboratorium-tindakan.component.html',
  providers: [
    LaboratoriumService,
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
    this.tindakanService.getTindakanOfLabByKodePasien(this.selectedLaboratorium.nama, this.searchTerm)
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
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
