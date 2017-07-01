const baseUrl = "http://127.0.0.1:8000";

export var ENV = {
	transaksiUrl: baseUrl + "/api/transaksi",
	pembayaranUrl: baseUrl + "/api/pembayaran",
	klaimUrl: baseUrl + "/api/klaim",
	settingsUrl: baseUrl + "/api/settings",
	jenisObatUrl: baseUrl + "/api/jenis_obat",
	stokObatUrl: baseUrl + "/api/stok_obat",
	obatMasukUrl: baseUrl + "/api/obat_masuk",		
	obatTebusUrl: baseUrl + "/api/obat_tebus",	
	obatTindakanUrl: baseUrl + "/api/obat_tindakan",	
	obatPindahUrl: baseUrl + "/api/obat_pindah",
	obatRusakUrl: baseUrl + "/api/obat_rusak"
}