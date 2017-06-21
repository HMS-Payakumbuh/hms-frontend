export class Transaksi {
	id: number;
	id_pasien: number;
	no_sep: string;
	nama_pasien: string;
	jenis_pasien: string;
	jenis_rawat: number;
	kelas_rawat: number;
	harga: number;
	tanggal: Date;
	pelunasan: Date;
	status: string;
	tindakan: any[];
	obat: any[];
}