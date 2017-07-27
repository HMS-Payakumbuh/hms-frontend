import { StokObat }    from '../stok-obat/stok-obat';
import { JenisObat }    from '../jenis-obat/jenis-obat';
import { LokasiObat }    from '../lokasi-obat/lokasi-obat';

export class ObatPindah {
	constructor(
    public id: number = null,
    public id_jenis_obat: number = null,
    public id_stok_obat_asal: number = null,    
    public id_stok_obat_tujuan: number = null,    
    public waktu_pindah: Date = null,
    public jumlah: number = null, 
    public asal: number = null, 
    public tujuan: number = null,
    public keterangan: string = '',    
    public stok_obat_asal: StokObat = new StokObat(),    
    public stok_obat_tujuan: StokObat = new StokObat(),
    public jenis_obat: JenisObat = new JenisObat(),
    public lokasi_asal: LokasiObat = new LokasiObat(),    
    public lokasi_tujuan: LokasiObat = new LokasiObat(),
  	) {  }
}