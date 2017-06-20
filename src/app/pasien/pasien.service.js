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
var _ = require("lodash");
require("rxjs/add/operator/toPromise");
var PasienService = (function () {
    function PasienService(http) {
        this.http = http;
        //Mock data
        this.allPasien = [
            { id: 1, nama: 'Octavianus Markus', tanggal_lahir: '02-07-1990', jender: 'Laki-laki', agama: 'Protestan', alamat: 'Jln.Ayam', kontak: '0987654321' },
            { id: 2, nama: 'Alexander Zucchini', tanggal_lahir: '25-02-1970', jender: 'Laki-laki', agama: 'Katolik', alamat: 'Jln.Sapi', kontak: '0987652131' },
            { id: 3, nama: 'John', tanggal_lahir: '12-03-1983', jender: 'Laki-laki', agama: 'Protestan', alamat: 'Jln.Machan', kontak: '098712321' },
            { id: 4, nama: 'Cliphonse Jo', tanggal_lahir: '12-03-1973', jender: 'Laki-laki', agama: 'Buddha', alamat: 'Jln.Michin', kontak: '09871425321' },
        ];
    }
    PasienService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    PasienService.prototype.getAllPasien = function () {
        return Promise.resolve(this.allPasien)
            .catch(this.handleError);
    };
    PasienService.prototype.getPasienByID = function (key) {
        return this.getAllPasien()
            .then(function (allPasien) { return allPasien.find(function (Pasien) { return Pasien.id === key; }); })
            .catch(this.handleError);
    };
    PasienService.prototype.getPasien = function (key) {
        return this.getAllPasien()
            .then(function (allPasien) {
            return _.filter(allPasien, function (pasien) {
                return pasien.nama.match(new RegExp(key, 'gi'));
            });
        })
            .catch(this.handleError);
    };
    return PasienService;
}());
PasienService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PasienService);
exports.PasienService = PasienService;
//# sourceMappingURL=pasien.service.js.map