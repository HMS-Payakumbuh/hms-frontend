import { JenisObat }	from '../jenis-obat/jenis-obat';
import { ObatMasuk }	from '../obat-masuk/obat-masuk';

export class ObatTebusItem {
	constructor(
	public id: number = null,
	public id_obat_tebus: number = null,
	public id_jenis_obat: number = null,
	public id_obat_masuk: number = null,
    public id_stok_obat: number = null,    
	public jumlah: number = null,
	public keterangan: string = '',
	public asal: number = null,
	public id_resep_item: number = null,
	public id_racikan_item: number = null,
	public harga_jual_realisasi: number = null,
	public jenis_obat: JenisObat = new JenisObat(),	
	public obat_masuk: ObatMasuk = new ObatMasuk()
	) { }
}