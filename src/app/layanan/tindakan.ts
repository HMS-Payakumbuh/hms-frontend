import { TindakanReference }	from './tindakan-reference';
import { ObatTindakan }				from '../farmasi/obat-tindakan/obat-tindakan';
import { Pasien }				from '../pasien/pasien';

export class Tindakan {
	constructor(
	public id: number = null,
	public id_transaksi: number = null,
	public harga: number = null,
	public keterangan: string = '',
	public id_pembayaran: number = null,
	public kode_tindakan: string = '',
	public id_pasien: number = null,
	public tanggal_waktu: string = '',
	public np_tenaga_medis: string = '',
	public nama_poli: string = '',
	public nama_lab: string = '',
	public nama_ambulans: string = '',
	public tindakan_reference: TindakanReference = null,
	public obat_tindakan: ObatTindakan[] = [],
	public pasien: Pasien = null
	) { }
}
