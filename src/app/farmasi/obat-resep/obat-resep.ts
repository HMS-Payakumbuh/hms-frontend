import { ObatResepItem }	from './obat-resep-item';

export class ObatResep {
	id: number;	
	id_transaksi: number;
	id_pasien: number;
	nama_pasien: string;
	waktu_keluar: Date;
	obat: ObatResepItem[];
}