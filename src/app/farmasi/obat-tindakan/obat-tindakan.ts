import { JenisObat }    from '../jenis-obat/jenis-obat';

export class ObatTindakan {	
	constructor(
    public id: number = null ,
    public id_jenis_obat: number = null,
    public id_obat_masuk: number = null,
    public waktu_keluar: Date = null,
    public jumlah: number = null,
    public keterangan: string = '',
    public asal: number = null,
    public harga_jual_realisasi: number = null,
    public id_transaksi: number = null,
    public id_tindakan: number = null
  ) {  }
}