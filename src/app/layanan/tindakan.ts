import { ObatTindakan }		from '../farmasi/obat-tindakan/obat-tindakan';

export class Tindakan {
	id_transaksi: number;
	no_tindakan: number;
	harga: number;
	dokumen_penunjang: number;
	keterangan: string;
	id_pembayaran: number;
	kode_tindakan: string;
	id_pasien: number;
	tanggal_waktu: string;
	np_tenaga_medis: string;
	nama_poli: string;
	nama_lab: string;
	nama_ambulans: string;
	obat_tindakan: ObatTindakan[] = [];
}
