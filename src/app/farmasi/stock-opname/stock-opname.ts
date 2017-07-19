import { StockOpnameItem }	from './stock-opname-item';
import { LokasiObat }    from '../lokasi-obat/lokasi-obat';

export class StockOpname {	
	constructor(
    public id: number = null,
    public lokasi: number = null,
    public lokasi_data: LokasiObat = new LokasiObat(),
    public stock_opname_item: StockOpnameItem[] = []
  ) {  }
}