export class RekamMedis {
  constructor(
    public id_pasien: number = null,
  	public tanggal_waktu: any = null,
    public np_dokter: string = null,
    public hasil_pemeriksaan: string = null,
    public anamnesis: string = null,
    public rencana_penatalaksanaan: string = null,
    public pelayanan_lain: string = null
  ) {  }
}
