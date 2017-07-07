export class RekamMedis {
  constructor(
    public id_pasien: number,
  	public tanggal_waktu: any,
    public np_dokter: string,
    public hasil_pemeriksaan: string,
    public anamnesis: string,
    public rencana_penatalaksanaan: string,
    public pelayanan_lain: string
  ) {  }
}
