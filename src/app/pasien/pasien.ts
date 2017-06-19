export class Pasien {

  constructor(
    public nama: string,
    public tanggal_lahir: string,
    public jender: string,
    public agama: string,
    public alamat: string,
    public kontak: string,
    public no_asuransi: string[]
  ) {  }

}