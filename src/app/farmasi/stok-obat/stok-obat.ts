import { ObatMasuk }	from '../obat-masuk/obat-masuk';
import { JenisObat }	from '../jenis-obat/jenis-obat';
import { LokasiObat }	from '../lokasi-obat/lokasi-obat';
import { ObatPindah }    from '../obat-pindah/obat-pindah';
import { ObatRusak }    from '../obat-rusak/obat-rusak';
import { ObatTindakan }   from '../obat-tindakan/obat-tindakan';
import { ObatEceranItem }   from '../obat-eceran/obat-eceran-item';
import { ObatTebusItem }   from '../obat-tebus/obat-tebus-item';

export class StokObat {	
	constructor(
    public id: number = null,
    public id_jenis_obat: number = null,
    public jumlah: number = null,
    public lokasi: number = null,
    public nomor_batch: string = '',
    public kadaluarsa: Date = null,
    public barcode: string = '',
    public jenis_obat: JenisObat = new JenisObat(),
    public lokasi_data: LokasiObat = new LokasiObat(),
    public obat_masuk: ObatMasuk[] = [],
    public obat_pindah_keluar: ObatPindah[] = [],
    public obat_pindah_masuk: ObatPindah[] = [],
    public obat_rusak: ObatRusak[] = [],    
    public obat_tindakan: ObatTindakan[] = [],
    public obat_eceran_item: ObatEceranItem[] = [],
    public obat_tebus_item: ObatTebusItem[] = []    
  ) {  }
}