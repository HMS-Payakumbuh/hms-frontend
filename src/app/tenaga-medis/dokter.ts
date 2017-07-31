import { TenagaMedis }		from './tenaga-medis';

export class Dokter {
	constructor (
		public no_pegawai: string = null,
		public spesialis: string = '',
		public tenaga_medis: TenagaMedis = new TenagaMedis()
	) {	}
}
