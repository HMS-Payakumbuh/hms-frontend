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
var transaksi_service_1 = require("./transaksi.service");
var TransaksiComponent = (function () {
    function TransaksiComponent(transaksiService) {
        this.transaksiService = transaksiService;
        this.allTransaksi = [
            { id: 1, id_pasien: 1, no_sep: '01312304', nama_pasien: 'Jonathan', harga: 1000000, tanggal: '21-02-1996', status: 'open', tindakan: [{ nama: 'operasi', harga: 500000 }, { nama: 'suntik HIV', harga: 500000 }], obat: [{ nama: 'betadine', satuan: 'botol', harga: 500000 }] },
            { id: 2, id_pasien: 3, no_sep: '01312304', nama_pasien: 'Agan', harga: 2000000, tanggal: '21-02-1996', status: 'open', tindakan: [{ nama: 'operasi', harga: 500000 }, { nama: 'suntik HIV', harga: 500000 }], obat: [{ nama: 'betadine', satuan: 'botol', harga: 500000 }] },
            { id: 3, id_pasien: 2, no_sep: '01312304', nama_pasien: 'Bambang', harga: 1500000, tanggal: '21-02-1996', status: 'closed', tindakan: [{ nama: 'operasi', harga: 500000 }, { nama: 'suntik HIV', harga: 500000 }], obat: [{ nama: 'betadine', satuan: 'botol', harga: 500000 }] }
        ]; //Mock-up
    }
    TransaksiComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.transaksiService.getAllTransaksi()
            .then(function (allTransaksi) { return _this.allTransaksi; });
    };
    TransaksiComponent.prototype.onClickDatePicker = function () {
        $('#datetimepicker').datepicker();
    };
    return TransaksiComponent;
}());
TransaksiComponent = __decorate([
    core_1.Component({
        selector: 'transaksi-page',
        templateUrl: './transaksi.component.html',
        providers: [transaksi_service_1.TransaksiService]
    }),
    __metadata("design:paramtypes", [transaksi_service_1.TransaksiService])
], TransaksiComponent);
exports.TransaksiComponent = TransaksiComponent;
//# sourceMappingURL=transaksi.component.js.map