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
var RawatinapService = (function () {
    function RawatinapService(http) {
        this.http = http;
        //Mock data
        this.allRawatinap = [
            { no_kamar: 'Anggrek-001', jenis_kamar: 'Rawat Inap', kelas: '3', harga_per_hari: 100, kapasitas_kamar: 2 },
            { no_kamar: 'Anggrek-002', jenis_kamar: 'ICU', kelas: '2', harga_per_hari: 100, kapasitas_kamar: 2 },
            { no_kamar: 'Mawar-001', jenis_kamar: 'Rawat Inap', kelas: '1', harga_per_hari: 40, kapasitas_kamar: 2 },
            { no_kamar: 'Matahari-001', jenis_kamar: 'Rawat Inap', kelas: 'VIP', harga_per_hari: 400, kapasitas_kamar: 2 }
        ];
    }
    RawatinapService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    RawatinapService.prototype.getAllRawatinap = function () {
        return Promise.resolve(this.allRawatinap)
            .catch(this.handleError);
    };
    RawatinapService.prototype.getRawatinapByNoKamar = function (no_kamar) {
        return this.getAllRawatinap()
            .then(function (allRawatinap) { return allRawatinap.find(function (rawatinap) { return rawatinap.no_kamar === no_kamar; }); })
            .catch(this.handleError);
    };
    RawatinapService.prototype.getRawatinapByJenisKamar = function (jenis_kamar) {
        return this.getAllRawatinap()
            .then(function (allRawatinap) { return allRawatinap.find(function (rawatinap) { return rawatinap.jenis_kamar === jenis_kamar; }); })
            .catch(this.handleError);
    };
    RawatinapService.prototype.getRawatinapByKelas = function (kelas) {
        return this.getAllRawatinap()
            .then(function (allRawatinap) { return allRawatinap.find(function (rawatinap) { return rawatinap.kelas === kelas; }); })
            .catch(this.handleError);
    };
    RawatinapService.prototype.getAvailableRawatinap = function () {
        return this.getAllRawatinap()
            .then(function (allRawatinap) { return allRawatinap.find(function (rawatinap) { return rawatinap.kapasitas_kamar > 0; }); })
            .catch(this.handleError);
    };
    return RawatinapService;
}());
RawatinapService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], RawatinapService);
exports.RawatinapService = RawatinapService;
//# sourceMappingURL=rawatinap.service.js.map