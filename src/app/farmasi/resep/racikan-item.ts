import { JenisObat }    from '../jenis-obat/jenis-obat';

export class RacikanItem {
	constructor(
	public id: number = null,
	public resep_item_id: number = null,
	public id_jenis_obat: string = '',
	public jumlah: number = 0,
	public jenis_obat: JenisObat = new JenisObat()
	) {}
}
