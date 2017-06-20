export class Pasien {

  constructor(
    public id: number,
    public nama: string,
    public tanggal_lahir: string,
    public umur: number,
    public jender: string,
    public agama: string,
    public alamat: string,
    public kontak: string
  ) {  }
}