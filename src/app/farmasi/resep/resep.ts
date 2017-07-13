import { ResepItem } from './resep-item';

export class Resep {
	constructor(
	public id: number = null,
	public id_transaksi: number = null,
	public id_tindakan: number = null,
	public no_resep: number = null,
	public resep_item: ResepItem[] = []
	) {}
}