export class JenisObat {
	constructor(
    public id: number = null,
    public merek_obat: string = '',
    public nama_generik: string = '',
    public pembuat: string = '',
    public golongan: string = '',
    public satuan: string = '',
    public harga_jual_satuan: number = null,
    public dicover_bpjs: boolean = false,    
    public special_medicine: boolean = false
  ) {  }
}

