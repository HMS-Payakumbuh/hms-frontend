export class ObatMasuk {	
	constructor(
    public id: number,
    public id_jenis_obat: number,
    public nomor_batch: string,
    public waktu_masuk: Date,
    public jumlah: number,
    public harga_beli_satuan: number,
    public kadaluarsa: Date,
    public barcode: string
  ) {  }
}