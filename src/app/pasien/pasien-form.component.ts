import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Pasien }    from './pasien';
import { PasienService }    from './pasien.service';
import { AntrianService }    from '../antrian/antrian.service';
import { Asuransi }  from './asuransi';
import { AsuransiService }  from './asuransi.service';
import { PoliklinikService }    from '../layanan/poliklinik.service';
import { LaboratoriumService }    from '../layanan/laboratorium.service';
import { JadwalDokter }   from '../tenaga-medis/jadwal-dokter';
import { TenagaMedisService}  from '../tenaga-medis/tenaga-medis.service';
import { TransaksiService}  from '../transaksi/transaksi.service';

@Component({
  selector: 'pasien-form',
  templateUrl: './pasien-form.component.html',
  providers: [
    PoliklinikService,
    LaboratoriumService,
    PasienService,
    AntrianService,
    AsuransiService,
    TransaksiService,
    TenagaMedisService
  ]
})
export class PasienFormComponent implements OnInit {
	tipe: string;
  layanan: string;
  doktor: string;
	search: string;
  no_rujukan: string;
  searchDone: boolean;
  update: boolean;
  sub: any;
  asuransi: Asuransi;
  pasien: Pasien;
  asuransiChecked:boolean;
  allAsuransi: Asuransi[];
  allLayanan: any[];
  allPasien: Pasien[] = [];
  allJadwalDokter: JadwalDokter[];

  constructor(
    private route: ActivatedRoute,
    private poliklinikService: PoliklinikService,
    private laboratoriumService: LaboratoriumService,
    private pasienService: PasienService,
    private antrianService: AntrianService,
    private asuransiService: AsuransiService,
    private transaksiService: TransaksiService,
    private tenagaMedisService: TenagaMedisService,
  ) {}

  submitted = false;

  allTipeLayanan = ['Poliklinik', 'Laboratorium'];

  genders = [{id: 0, nama: 'Laki-laki'}, {id: 1, nama: 'Perempuan'}];

  religions = ['Islam', 'Protestan', 'Katolik', 'Buddha', 'Hindu', 'Konghucu'];

  ngOnInit() {
    this.pasien = new Pasien(null,'','',null,null,'','','');
    this.asuransi = new Asuransi(null,'',null);

    this.sub = this.route.params
      .subscribe(params => {
        this.layanan = params['namaLayanan'];
    });
    if (this.layanan === undefined) {

    } else {
      if (this.layanan.indexOf("Poli") >= 0)
          this.tipe = "Poliklinik";
        else
          this.tipe = "Laboratorium";
        this.selectTipeLayanan();
        this.selectLayanan();
    }

  }

  private searchPasien() {
    if (this.search.match(/([1-9][0-9]*)/)) {
      this.allPasien = [];
      this.pasienService.getPasien(parseInt(this.search))
        .subscribe(allPasien => {
          this.allPasien.push(allPasien);
        });
    } else {
       this.pasienService.getPasienByName(this.search)
        .subscribe(allPasien => this.allPasien = allPasien);
    }
  }

  private selectPasien() {
    this.asuransiService.getAsuransi(this.pasien.id).subscribe(allAsuransi => this.allAsuransi = allAsuransi);
    this.searchDone = true;
  }

  private selectTipeLayanan() {
    if (this.tipe === 'Poliklinik') {
      this.poliklinikService.getAllPoliklinik().subscribe(
        data => { this.allLayanan = data }
      )
    } else if (this.tipe === 'Laboratorium') {
      this.laboratoriumService.getAllLaboratorium().subscribe(
        data => { this.allLayanan = data }
      )
    }
  }

  private selectLayanan() {
    this.tenagaMedisService.getAllAvailableJadwalDokter(this.layanan).subscribe(
      data => { this.allJadwalDokter = data }
    )
  }

  private customTrackBy(index: number, obj: any): any {
    return index;
  }

  private pakaiAsuransi(asuransi: Asuransi) {
    this.asuransi = asuransi;
  }

  //jenis still hardcoded
  private createAntrian(id: number) {
    let request: any = null;
    if (this.tipe === 'Poliklinik') {
      request = {
        id_transaksi: id,
        nama_layanan_poli: this.layanan,
        jenis: 0,
      };
    }
    else if (this.tipe === 'Laboratorium') {
      request = {
        id_transaksi: id,
        nama_layanan_lab: this.layanan,
        jenis: 0,
      };
    }
    this.antrianService.createAntrian(request).subscribe(
      data => {window.location.reload()}
    );
  }

  private createTransaksi(id: number) {
    let kode_jenis_pasien:number = 1;
    if (this.asuransiChecked) {
      kode_jenis_pasien = 2;
    }
    let payload: any = {
      id_pasien: id,
      no_sep: "00990099",
      kode_jenis_pasien: kode_jenis_pasien,
      asuransi_pasien: this.asuransi.nama_asuransi,
      jenis_rawat: 2,
    };
    let request: any = {
      transaksi : payload
    }
    this.transaksiService.createTransaksi(request).subscribe(
      data => {
        this.createAntrian(data.transaksi.id)
      }
    );
  }

  private createPasien() {
    alert(JSON.stringify(this.pasien));
    this.pasienService.createPasien(this.pasien).subscribe(
      data => {
        this.asuransi.id_pasien = data.id;
        let asuransi:any = { asuransi: this.asuransi };  
        this.asuransiService.createAsuransi(asuransi).subscribe(
          data => {}
        );
        this.createTransaksi(data.id);
      }
    );
  }
}
