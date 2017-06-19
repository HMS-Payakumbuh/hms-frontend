"use strict";
var Pasien = (function () {
    function Pasien(nama, tanggal_lahir, jender, agama, alamat, kontak, no_asuransi) {
        this.nama = nama;
        this.tanggal_lahir = tanggal_lahir;
        this.jender = jender;
        this.agama = agama;
        this.alamat = alamat;
        this.kontak = kontak;
        this.no_asuransi = no_asuransi;
    }
    return Pasien;
}());
exports.Pasien = Pasien;
//# sourceMappingURL=pasien.js.map