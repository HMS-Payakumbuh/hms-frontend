import { JenisObat }    from '../jenis-obat/jenis-obat';
import { StokObat }	from '../stok-obat/stok-obat';

export class ObatEceranItem {
	constructor(
	public id: number = null,
	public id_jenis_obat: number = null, 
    public id_stok_obat: number = null,
    public id_pembayaran: number = null,    
    public jumlah: number = null,
    public harga_jual_realisasi: number = null,
	public waktu_keluar: Date = null,
	public jenis_obat: JenisObat = new JenisObat(),
	public obat_masuk: StokObat = new StokObat()
	) {}
}