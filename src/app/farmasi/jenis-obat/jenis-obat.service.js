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
var JenisObatService = (function () {
    function JenisObatService(http) {
        this.http = http;
        // private jenisObatUrl = ENV.jenisObatUrl;
        this.allJenisObat = [
            { id: 2138, merek: 'Cefixim syr kering 100mg/5ml	', nama_generik: 'Cefixim', pembuat: 'Indofarma', golongan: 'Antibiotik', satuan: 'Botol', harga: 10106.36, keterangan: '' },
            { id: 2517, merek: 'Amlodipine tab 5mg', nama_generik: 'Amlodipine', pembuat: 'Hexpharm', golongan: 'Keras', satuan: 'Tablet', harga: 229.00, keterangan: '' },
            { id: 2534, merek: 'Amlodipine tab 10mg', nama_generik: 'Amlodipine', pembuat: 'Hexpharm', golongan: 'Keras', satuan: 'Tablet', harga: 420.00, keterangan: '' }
        ]; // Mock-up
    }
    JenisObatService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    JenisObatService.prototype.getAllJenisObat = function () {
        return Promise.resolve(this.allJenisObat)
            .catch(this.handleError);
    };
    JenisObatService.prototype.getJenisObat = function (id) {
        return this.getAllJenisObat()
            .then(function (allJenisObat) { return allJenisObat.find(function (JenisObat) { return JenisObat.id === id; }); })
            .catch(this.handleError);
    };
    return JenisObatService;
}());
JenisObatService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], JenisObatService);
exports.JenisObatService = JenisObatService;
//# sourceMappingURL=jenis-obat.service.js.map