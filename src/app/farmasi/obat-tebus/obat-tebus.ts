import { ObatTebusItem }	from './obat-tebus-item';

export class ObatTebus {
	id: number;	
	id_transaksi: number;
	id_pasien: number;
	nama_pasien: string;
	waktu_keluar: Date;
	obat: ObatTebusItem[];
}