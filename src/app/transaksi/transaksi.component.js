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
    }
    TransaksiComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.transaksiService.getAllTransaksi()
            .then(function (allTransaksi) { return _this.allTransaksi = allTransaksi; });
    };
    TransaksiComponent.prototype.onClickDatePicker = function () {
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