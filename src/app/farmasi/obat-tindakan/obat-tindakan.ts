import { JenisObat }    from '../jenis-obat/jenis-obat';
import { StokObat }			from '../stok-obat/stok-obat';

export class ObatTindakan {
	constructor(
    public id: number = null ,
    public id_jenis_obat: number = null,
    public id_stok_obat: number = null,    
    public waktu_keluar: Date = null,
    public jumlah: number = 0,
    public keterangan: string = '',
    public asal: number = null,
    public harga_jual_realisasi: number = null,
    public id_transaksi: number = null,
    public id_tindakan: number = null,
	public stok_obat: StokObat = null
  ) {  }
}
