import { TenagaMedis }		from './tenaga-medis';

export class Dokter {
	constructor (
		public no_pegawai: number = null,
		public tenaga_medis: TenagaMedis = new TenagaMedis()
	) {	}
}
