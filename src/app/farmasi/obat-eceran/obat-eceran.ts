import { ObatEceranItem }    from './obat-eceran-item';

export class ObatEceran {
	constructor(
	public id: number = null,
	public nama_pembeli: string = '',
	public waktu_transaksi: Date = null,
	public obat_eceran_item: ObatEceranItem[] = []
	) {}
}