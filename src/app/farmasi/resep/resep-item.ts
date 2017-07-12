import { RacikanItem } from './racikan-item';

export class ResepItem {
	constructor(
	public id: number = null,
	public resep_id: number = null,
	public aturan_pemakaian: string = '',
	public petunjuk_peracikan: string = '',
	public racikan_item: RacikanItem[] = []
	) {}
}