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
var obat_rusak_service_1 = require("./obat-rusak.service");
var DaftarObatRusakComponent = (function () {
    function DaftarObatRusakComponent(ObatRusakService) {
        this.ObatRusakService = ObatRusakService;
    }
    DaftarObatRusakComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ObatRusakService.getAllObatRusak()
            .then(function (allObatRusak) { return _this.allObatRusak = allObatRusak; });
    };
    return DaftarObatRusakComponent;
}());
DaftarObatRusakComponent = __decorate([
    core_1.Component({
        selector: 'daftar-obat-rusak-page',
        templateUrl: './daftar-obat-rusak.component.html',
        providers: [obat_rusak_service_1.ObatRusakService]
    }),
    __metadata("design:paramtypes", [obat_rusak_service_1.ObatRusakService])
], DaftarObatRusakComponent);
exports.DaftarObatRusakComponent = DaftarObatRusakComponent;
//# sourceMappingURL=daftar-obat-rusak.component.js.map