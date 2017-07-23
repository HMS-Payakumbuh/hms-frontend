export class Pasien {
  constructor(
    public id: number = null,
    public kode_pasien: string = '',
    public nama_pasien: string = '',
    public tanggal_lahir: string = '',
    public umur: number = null,
    public jender: number = null,
    public agama: string = '',
    public alamat: string = '',
    public kontak: string = '',
    public gol_darah: string = ''
  ) {  }
}