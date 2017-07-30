import { ObatMasuk }	from '../obat-masuk/obat-masuk';
import { JenisObat }	from '../jenis-obat/jenis-obat';
import { StokObat }	from '../stok-obat/stok-obat';

export class StockOpnameItem {	
	constructor(
    public id: number = null,
    public id_stock_opname: number = null,
    public id_stok_obat: number = null,
    public id_jenis_obat: number = null,
    public id_obat_masuk: number = null,
    public jumlah_awal: number = null,
    public jumlah_akhir: number = null,
    public jumlah_fisik: number = null,
    public jenis_obat: JenisObat = new JenisObat(),
    public stok_obat: StokObat = new StokObat()
  ) {  }
}