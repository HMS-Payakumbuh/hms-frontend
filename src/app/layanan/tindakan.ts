import { ObatTindakan }		from '../farmasi/obat-tindakan/obat-tindakan';

export class Tindakan {
	id: number = null;
	id_transaksi: number = null;
	harga: number = null;
	keterangan: string = '';
	id_pembayaran: number = null;
	kode_tindakan: string = '';
	id_pasien: number = null;
	tanggal_waktu: string = '';
	np_tenaga_medis: string = '';
	nama_poli: string = '';
	nama_lab: string = '';
	nama_ambulans: string = '';
	obat_tindakan: ObatTindakan[] = [];
}
