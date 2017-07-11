export class Settings {
	tarif_rs: string;
	kd_tarif_rs: string;
	coder_nik: string;
	add_payment_pct: string;

	constructor(
		tarif_rs: string,
		kd_tarif_rs: string,
		coder_nik: string,
		add_payment_pct: string,
	) {
		this.tarif_rs = tarif_rs;
		this.kd_tarif_rs = kd_tarif_rs;
		this.coder_nik = coder_nik;
		this.add_payment_pct = add_payment_pct;
	}
}