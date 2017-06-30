export class ObatPindah {
	constructor(
    public id: number,
    public id_jenis_obat: number,
    public id_obat_masuk: number,
    public waktu_pindah: Date,
    public jumlah: string,
    public alasan: string,    
    public asal: number, 
    public tujuan: number,
    public keterangan: string
  	) {  }
}