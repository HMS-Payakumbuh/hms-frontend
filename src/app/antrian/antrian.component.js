"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var AntrianComponent = (function () {
    function AntrianComponent() {
        this.antrianUmum = [
            { no_antrian: 1, nama_pasien: 'Jonathan', waktu: '09:15:15' },
            { no_antrian: 2, nama_pasien: 'Ben Lemuel', waktu: '09:15:45' },
            { no_antrian: 3, nama_pasien: 'Fiqie', waktu: '09:16:15' },
        ]; //Mock-up
        this.antrianKhusus = [
            { no_antrian: 4, nama_pasien: 'Al Ex', waktu: '09:15:15' },
            { no_antrian: 5, nama_pasien: 'Hu Wan', waktu: '09:15:45' },
            { no_antrian: 6, nama_pasien: 'Gunawan', waktu: '09:16:15' },
        ];
        this.kategoriAntrian = ['A', 'B', 'C', 'D'];
        this.nomor = 0;
        this.active = 1;
        this.umum = true;
        this.isfrontoffice = true;
        this.submitted = false;
    }
    AntrianComponent.prototype.proses = function (no_antrian) {
        this.nomor = no_antrian;
        if (this.umum) {
            this.antrianUmum.splice(0, 1);
            this.active = this.antrianKhusus[0].no_antrian;
        }
        else {
            this.antrianKhusus.splice(0, 1);
            this.active = this.antrianUmum[0].no_antrian;
        }
        this.umum = !this.umum;
    };
    AntrianComponent.prototype.changeKategori = function () {
        console.log("kategori baru");
    };
    AntrianComponent.prototype.onSubmit = function () { this.submitted = true; };
    return AntrianComponent;
}());
AntrianComponent = __decorate([
    core_1.Component({
        selector: 'antrian',
        templateUrl: './antrian.component.html'
    })
], AntrianComponent);
exports.AntrianComponent = AntrianComponent;
//# sourceMappingURL=antrian.component.js.map