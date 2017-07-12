import { ObatTebusItem }	from './obat-tebus-item';

export class ObatTebus {
	constructor(
	public id: number = null,
	public id_transaksi: number = null,
	public id_tindakan: number = null,
	public id_resep: number = null,
	public obat_tebus_item: ObatTebusItem[] = []
	) { }
}