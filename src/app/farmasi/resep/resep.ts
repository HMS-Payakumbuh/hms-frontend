import { ResepItem } from './resep-item';

export class Resep {
	constructor(
	public id: number = null,
	public id_transaksi: number = null,
	public nama: string = "",
	public alamat: string = "",
	public eksternal: boolean = false,
	public resep_item: ResepItem[] = []
	) {}
}
