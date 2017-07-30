import { JenisObat }	from '../jenis-obat/jenis-obat';
import { StokObat }	from '../stok-obat/stok-obat';

export class ObatTebusItem {
	constructor(
	public id: number = null,
	public id_obat_tebus: number = null,
	public id_jenis_obat: number = null,
    public id_stok_obat: number = null,    
	public jumlah: number = null,
	public keterangan: string = '',
	public waktu_keluar: Date = null,
	public asal: number = null,
	public id_resep_item: number = null,
	public id_racikan_item: number = null,
	public harga_jual_realisasi: number = null,
	public jenis_obat: JenisObat = new JenisObat(),	
	public stok_obat: StokObat = new StokObat()
	) { }
}