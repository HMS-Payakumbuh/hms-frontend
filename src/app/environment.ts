const baseUrl = "http://127.0.0.1:8000";

export var ENV = {
	transaksiUrl: baseUrl + "/api/transaksi",
	pembayaranUrl: baseUrl + "/api/pembayaran",
	klaimUrl: baseUrl + "/api/klaim",
	settingsUrl: baseUrl + "/api/settings",

	diagnosisReferenceUrl: baseUrl + "/api/daftar_diagnosis",
	tindakanReferenceUrl: baseUrl + "/api/daftar_tindakan",
	tindakanUrl: baseUrl + "/api/tindakan",
	poliklinikUrl: baseUrl + "/api/poliklinik",
	laboratoriumUrl: baseUrl + "/api/laboratorium",
	ambulansUrl: baseUrl + "/api/ambulans",
	tenagaMedisUrl: baseUrl + "/api/tenaga_medis",
	dokterUrl: baseUrl + "/api/dokter",
	jadwalDokterUrl: baseUrl + "/api/jadwal_dokter",

	rawatinapUrl : baseUrl + "/api/rawatinap",

	lokasiObatUrl: baseUrl + "/api/lokasi_obat",
	jenisObatUrl: baseUrl + "/api/jenis_obat",
	stokObatUrl: baseUrl + "/api/stok_obat",
	obatMasukUrl: baseUrl + "/api/obat_masuk",
	obatTebusUrl: baseUrl + "/api/obat_tebus",
	obatTindakanUrl: baseUrl + "/api/obat_tindakan",
	obatPindahUrl: baseUrl + "/api/obat_pindah",
	obatRusakUrl: baseUrl + "/api/obat_rusak"
}
