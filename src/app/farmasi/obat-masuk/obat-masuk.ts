import { JenisObat }    from '../jenis-obat/jenis-obat';

export class ObatMasuk {	
	constructor(
    public id: number = null ,
    public id_jenis_obat: number = null,
    public nomor_batch: string = '',
    public waktu_masuk: Date = null,
    public jumlah: number = null,
    public harga_beli_satuan: number = null,
    public kadaluarsa: Date = null,
    public barcode: string = '',
    public jenis_obat: JenisObat = new JenisObat()
  ) {  }
}