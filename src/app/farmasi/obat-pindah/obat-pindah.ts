import { ObatMasuk }    from '../obat-masuk/obat-masuk';
import { JenisObat }    from '../jenis-obat/jenis-obat';
import { LokasiObat }    from '../lokasi-obat/lokasi-obat';

export class ObatPindah {
	constructor(
    public id: number = null,
    public id_jenis_obat: number = null,
    public id_obat_masuk: number = null,
    public id_stok_obat: number = null,    
    public waktu_pindah: Date = null,
    public jumlah: string = '', 
    public asal: number = null, 
    public tujuan: number = null,
    public keterangan: string = '',    
    public obat_masuk: ObatMasuk = new ObatMasuk(),
    public jenis_obat: JenisObat = new JenisObat(),
    public lokasi_asal: LokasiObat = new LokasiObat(),    
    public lokasi_tujuan: LokasiObat = new LokasiObat(),
  	) {  }
}