import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
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
  dokter: string;
	search: string;
  no_rujukan: string;
  searchDone: boolean;
  update: boolean;
  fromAntrian: boolean = false;
  sub: any;
  asuransi: Asuransi;
  pasien: Pasien;
  asuransiChecked:boolean;
  allAsuransi: Asuransi[];
  allLayanan: any[];
  allPasien: Pasien[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
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

  genders = [{id: 1, nama: 'Laki-laki'}, {id: 2, nama: 'Perempuan'}];

  religions = ['Islam', 'Protestan', 'Katolik', 'Buddha', 'Hindu', 'Konghucu'];

  bloodTypes = ['A', 'B', 'O', 'AB'];

  ngOnInit() {
    this.pasien = new Pasien();
    this.asuransi = new Asuransi();

    this.sub = this.route.params
      .subscribe(params => {
        this.layanan = params['namaLayanan'];
    });
    if (this.layanan === undefined) {

    } else {
      this.fromAntrian = true;
      if (this.layanan.indexOf("Poli") >= 0)
          this.tipe = "Poliklinik";
        else
          this.tipe = "Laboratorium";
      this.selectTipeLayanan();
    }
  }

  private searchPasien() {
    if (this.search) {
      if (this.search.match(/\d/)) {
        this.allPasien = [];
        this.pasienService.getPasien(this.search)
          .subscribe(allPasien => {
            if (allPasien) {
              this.allPasien.push(allPasien);
              this.pasien = this.allPasien[0];
              this.selectPasien();
            }
          });
      } else {
         this.pasienService.getPasienByName(this.search)
          .subscribe(allPasien => this.allPasien = allPasien);
      }
    }
  }

  private selectPasien() {
    this.asuransiService.getAsuransi(this.pasien.id).subscribe(allAsuransi => this.allAsuransi = allAsuransi);
    this.searchDone = true;
  }

  private selectTipeLayanan() {
    if (this.tipe === 'Poliklinik') {
      this.poliklinikService.getAllPoliklinik().subscribe(
        data => { 
          this.allLayanan = data;
          for (let layanan of this.allLayanan) {
            this.tenagaMedisService.getAllAvailableJadwalDokter(layanan.nama).subscribe(
              data => {
                layanan.nama_dokter = data.nama_dokter;
              }
            )
          } 
        }
      )
      
    } else if (this.tipe === 'Laboratorium') {
      this.laboratoriumService.getAllLaboratorium().subscribe(
        data => { this.allLayanan = data }
      )
    }
  }

  private customTrackBy(index: number, obj: any): any {
    return index;
  }

  private pakaiAsuransi(asuransi: Asuransi) {
    this.asuransi = asuransi;
  }

  private createAntrian(id_transaksi: number, id_pasien: number, id_asuransi:number) {
    let request: any = null;
    if (this.tipe === 'Poliklinik') {
      request = {
        id_transaksi: id_transaksi,
        nama_layanan_poli: this.layanan,
        kesempatan: 3,
        id_pasien: id_pasien,
        id_asuransi: id_asuransi
      };
    }
    else if (this.tipe === 'Laboratorium') {
      request = {
        id_transaksi: id_transaksi,
        nama_layanan_lab: this.layanan,
        kesempatan: 3,
        id_pasien: id_pasien,
        id_asuransi: id_asuransi
      };
    }

    this.antrianService.createAntrian(request).subscribe(
      data => {
        if(data.error) {
          alert(data.error);
          window.location.reload();
        } else {
          this.location.back();
        }
      }
    );
  }

  private createTransaksi(id_pasien: number, id_asuransi:number) {
    let kode_jenis_pasien:number = 1;
    let payload: any;
    if (this.asuransiChecked) {
      kode_jenis_pasien = 2;
    }
    if (this.asuransi.nama_asuransi == 'bpjs') {
      payload = {
        id_pasien: id_pasien,
        no_sep: Math.random().toString(36).substring(7),
        kode_jenis_pasien: kode_jenis_pasien,
        asuransi_pasien: this.asuransi.nama_asuransi,
        jenis_rawat: 2,
      };
    }
    else {
      payload = {
        id_pasien: id_pasien,
        kode_jenis_pasien: kode_jenis_pasien,
        asuransi_pasien: this.asuransi.nama_asuransi,
        jenis_rawat: 2,
      };
    }
    let request: any = {
      transaksi : payload
    }
    this.transaksiService.createTransaksi(request).subscribe(
      data => {
        this.createAntrian(data.transaksi.id, id_pasien, id_asuransi)
      }
    );
  }

  private createAsuransi(id_pasien: number) {
    this.asuransi.id_pasien = id_pasien;
    let asuransi:any = { asuransi: this.asuransi };
    this.asuransiService.createAsuransi(asuransi).subscribe(
      data => {this.createTransaksi(id_pasien, data.id)}
    );
  }

  private createPasien() {
    alert(JSON.stringify(this.pasien));

    if (this.update) {
      this.pasienService.updatePasien(this.pasien.id, this.pasien).subscribe(
        data => {
          if (this.asuransiChecked)
            this.createAsuransi(data.id);
          else
            this.createTransaksi(data.id, null);
        }
      );
    } else {
      this.pasienService.createPasien(this.pasien).subscribe(
        data => {
          if (this.asuransiChecked)
            this.createAsuransi(data.id);
          else
            this.createTransaksi(data.id, null);
        }
      );
    }
  }
}
