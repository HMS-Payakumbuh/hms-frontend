import { ResepItem } from './resep-item';
import { Transaksi } from '../../transaksi/transaksi';
import { TransaksiEksternal } from '../../transaksi/transaksi-eksternal';

export class Resep {
	constructor(
	public id: number = null,
	public id_transaksi: number = null,
	public id_transaksi_eksternal: number = null,
	public nama: string = "",
	public alamat: string = "",
	public nama_dokter: string = "",
	public umur: number = null,
	public no_telepon: string = "",
	public eksternal: boolean = false,
	public resep_item: ResepItem[] = [],
	public transaksi: Transaksi = new Transaksi(),
	public tebus: boolean = false,
	public transaksi_eksternal: TransaksiEksternal = new TransaksiEksternal()
	) {}
}