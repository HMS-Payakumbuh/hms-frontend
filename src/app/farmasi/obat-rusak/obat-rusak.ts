import { StokObat }    from '../stok-obat/stok-obat';
import { JenisObat }    from '../jenis-obat/jenis-obat';
import { LokasiObat }    from '../lokasi-obat/lokasi-obat';

export class ObatRusak {
	constructor(
    public id: number = null,
    public id_jenis_obat: number = null,
    public id_stok_obat: number = null,    
    public waktu_keluar: Date = null,
    public jumlah: number = null,
    public alasan: string = '',    
    public asal: number = null,
    public keterangan: string = '',
    public stok_obat: StokObat = new StokObat(),
    public jenis_obat: JenisObat = new JenisObat(),
    public lokasi_asal: LokasiObat = new LokasiObat()
  	) {  }
}