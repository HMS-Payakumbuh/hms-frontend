"use strict";
var Pasien = (function () {
    function Pasien(id, nama, tanggal_lahir, jender, agama, alamat, kontak) {
        this.id = id;
        this.nama = nama;
        this.tanggal_lahir = tanggal_lahir;
        this.jender = jender;
        this.agama = agama;
        this.alamat = alamat;
        this.kontak = kontak;
    }
    return Pasien;
}());
exports.Pasien = Pasien;
//# sourceMappingURL=pasien.js.map