import { ObatEceranItem }    from './obat-eceran-item';
import { TransaksiEksternal } from '../../transaksi/transaksi-eksternal';

export class ObatEceran {
	constructor(
	public id: number = null,
	public id_transaksi: number = null,
	public id_pembayaran: number = null,
	public waktu_transaksi: Date = null,
	public nama: string = '',
	public alamat: string = '',
	public no_telepon: string = '',
	public umur: number = null,
	public obat_eceran_item: ObatEceranItem[] = [],	
	public transaksi_eksternal: TransaksiEksternal = new TransaksiEksternal(),
	) {}
}