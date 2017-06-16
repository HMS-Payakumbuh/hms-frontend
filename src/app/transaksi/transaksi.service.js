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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var environment_1 = require("../environment");
var TransaksiService = (function () {
    function TransaksiService(http) {
        this.http = http;
        this.transaksiUrl = environment_1.ENV.transaksiUrl;
        this.allTransaksi = [
            { id: 1, id_pasien: 1, no_sep: '01312304', nama_pasien: 'Jonathan', harga: 510000, tanggal: '12-06-2017', status: 'open', tindakan: [{ nama: 'Operasi Katarak', harga: 500000 }], obat: [{ nama: 'Panadol', satuan: 'strip', jumlah: 1, harga_satuan: 10000 }] },
            { id: 2, id_pasien: 3, no_sep: '', nama_pasien: 'Agan', harga: 5500000, tanggal: '15-06-2017', status: 'open', tindakan: [{ nama: 'Operasi Kelamin', harga: 5000000 }, { nama: 'Pemasangan Prosthesis', harga: 500000 }], obat: [] },
            { id: 3, id_pasien: 2, no_sep: '01312564', nama_pasien: 'Bambang', harga: 1010000, tanggal: '12-05-2016', status: 'closed', tindakan: [{ nama: 'Operasi Usus Buntu', harga: 1000000 }], obat: [{ nama: 'Paramex', satuan: 'strip', jumlah: 2, harga_satuan: 5000 }] }
        ]; //Mock-up
    }
    TransaksiService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    TransaksiService.prototype.getAllTransaksi = function () {
        return Promise.resolve(this.allTransaksi)
            .catch(this.handleError);
    };
    TransaksiService.prototype.getTransaksi = function (id) {
        return this.getAllTransaksi()
            .then(function (allTransaksi) { return allTransaksi.find(function (transaksi) { return transaksi.id === id; }); })
            .catch(this.handleError);
    };
    return TransaksiService;
}());
TransaksiService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TransaksiService);
exports.TransaksiService = TransaksiService;
//# sourceMappingURL=transaksi.service.js.map