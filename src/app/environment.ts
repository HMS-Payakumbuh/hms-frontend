const baseUrl = "http://127.0.0.1:8000";

export var ENV = {
	transaksiUrl: baseUrl + "/api/transaksi",
	pembayaranUrl: baseUrl + "/api/pembayaran",
	klaimUrl: baseUrl + "/api/klaim",
	settingsUrl: baseUrl + "/api/setting_bpjs",

	pasienUrl: baseUrl + "/api/pasien",
	rekamMedisUrl: baseUrl + "/api/rekam_medis",
	antrianUrl: baseUrl + "/api/antrian",
	antrianFrontOfficeUrl: baseUrl + "/api/antrian_front_office",
	asuransiUrl: baseUrl + "/api/asuransi",

	diagnosisReferenceUrl: baseUrl + "/api/daftar_diagnosis",
	tindakanReferenceUrl: baseUrl + "/api/daftar_tindakan",
	diagnosisUrl: baseUrl + "/api/diagnosis",
	tindakanUrl: baseUrl + "/api/tindakan",
	poliklinikUrl: baseUrl + "/api/poliklinik",
	laboratoriumUrl: baseUrl + "/api/laboratorium",
	ambulansUrl: baseUrl + "/api/ambulans",
	tenagaMedisUrl: baseUrl + "/api/tenaga_medis",
	dokterUrl: baseUrl + "/api/dokter",
	jadwalDokterUrl: baseUrl + "/api/jadwal_dokter",

	tempattidurUrl : baseUrl + "/api/tempattidur",
	rawatinapUrl : baseUrl + "/api/rawatinap",

	pemakaianKamarOperasiUrl : baseUrl + "/api/pemakaiankamaroperasi",
	pemakaianKamarJenazahUrl : baseUrl + "/api/pemakaiankamarjenazah",
	kamarOperasiUrl : baseUrl + "/api/kamaroperasi",
	kamarJenazahUrl : baseUrl + "/api/kamarjenazah",


	lokasiObatUrl: baseUrl + "/api/lokasi_obat",
	jenisObatUrl: baseUrl + "/api/jenis_obat",
	stokObatUrl: baseUrl + "/api/stok_obat",
	obatMasukUrl: baseUrl + "/api/obat_masuk",
	obatTebusUrl: baseUrl + "/api/obat_tebus",
	obatTindakanUrl: baseUrl + "/api/obat_tindakan",
	obatPindahUrl: baseUrl + "/api/obat_pindah",
	obatRusakUrl: baseUrl + "/api/obat_rusak"
}
