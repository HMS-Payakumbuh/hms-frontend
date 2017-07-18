import { ObatTebusItem }	from './obat-tebus-item';
import { Resep }	from '../resep/resep';
import { Pasien } from '../../pasien/pasien';

export class ObatTebus {
	constructor(
	public id: number = null,
	public id_transaksi: number = null,
	public id_resep: number = null,	
	public waktu_keluar: Date = null,
	public resep: Resep = new Resep(),
	public pasien: Pasien = new Pasien(),
	public obat_tebus_item: ObatTebusItem[] = []
	) { }
}