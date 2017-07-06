export class Pasien {

  constructor(
    public id: number,
    public nama_pasien: string,
    public tanggal_lahir: string,
    public umur: number,
    public jender: number,
    public agama: string,
    public alamat: string,
    public kontak: string,
    public asuransi?: any
  ) {  }
}