export class ObatResepItem {
	id: number;
	kode_obat: number;	
	merek: string;	
	nomor_batch: string;
	satuan: string;
	harga_jual_referensi: number;
	harga_jual_realisasi: number;
	kadaluarsa: Date;
	jumlah: number;
}