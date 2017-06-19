"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
// import { ENV }				from '.../environment';
var ObatPindahService = (function () {
    function ObatPindahService(http) {
        this.http = http;
        // private ObatPindahUrl = ENV.ObatPindahUrl;
        this.allObatPindah = [
            { id: 1, id_jenis: 2138, merek: 'Cefixim syr kering 100mg/5ml', nama_generik: 'Cefixim', pembuat: 'Indofarma', golongan: 'Antibiotik', satuan: 'Botol', harga_jual: 10100.00, nomor_batch: '085G611NV', waktu_masuk: '11 September 2016 16:18', kadaluarsa: '19 Juni 2017', harga_beli: 9180.36, kode_obat: 213816091102, waktu_keluar: '12 Juni 2017 08:33', jumlah: 5, asal: 'Gudang Utama', tujuan: 'Apotek', keterangan: '' },
            { id: 2, id_jenis: 2138, merek: 'Cefixim syr kering 100mg/5ml', nama_generik: 'Cefixim', pembuat: 'Indofarma', golongan: 'Antibiotik', satuan: 'Botol', harga_jual: 10100.00, nomor_batch: '085G610NV', waktu_masuk: '11 September 2016 16:16', kadaluarsa: '18 Juni 2017', harga_beli: 9180.36, kode_obat: 213816091101, waktu_keluar: '19 Juni 2017 09:48', jumlah: 37, asal: 'Apotek', tujuan: 'Gudang Utama', keterangan: '' }
        ]; // Mock-up
    }
    ObatPindahService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    ObatPindahService.prototype.getAllObatPindah = function () {
        return Promise.resolve(this.allObatPindah)
            .catch(this.handleError);
    };
    ObatPindahService.prototype.getObatPindah = function (id) {
        return this.getAllObatPindah()
            .then(function (allObatPindah) { return allObatPindah.find(function (ObatPindah) { return ObatPindah.id === id; }); })
            .catch(this.handleError);
    };
    return ObatPindahService;
}());
ObatPindahService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ObatPindahService);
exports.ObatPindahService = ObatPindahService;
//# sourceMappingURL=obat-pindah.service.js.map