export class ObatRusak {
	constructor(
    public id: number,
    public id_jenis_obat: number,
    public id_obat_masuk: number,
    public waktu_keluar: Date,
    public jumlah: string,
    public alasan: string,    
    public asal: number,
    public keterangan: string
  	) {  }
}