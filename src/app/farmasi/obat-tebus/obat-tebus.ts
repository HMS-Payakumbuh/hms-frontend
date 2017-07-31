import { ObatTebusItem }	from './obat-tebus-item';
import { Resep }	from '../resep/resep';
import { Pasien } from '../../pasien/pasien';
import { TransaksiEksternal } from '../../transaksi/transaksi-eksternal';

export class ObatTebus {
	constructor(
	public id: number = null,
	public id_transaksi: number = null,
	public id_transaksi_eksternal: number = null,
	public eksternal: boolean = false,
	public id_resep: number = null,	
	public waktu_keluar: Date = null,
	public resep: Resep = new Resep(),
	public pasien: Pasien = new Pasien(),
	public obat_tebus_item: ObatTebusItem[] = [],
	public transaksi_eksternal: TransaksiEksternal = new TransaksiEksternal(),
	) { }
}