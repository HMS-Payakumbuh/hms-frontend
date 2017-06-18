"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var FilterNamaPasienPipe = (function () {
    function FilterNamaPasienPipe() {
    }
    FilterNamaPasienPipe.prototype.transform = function (items, param) {
        if (!items || !param) {
            return items;
        }
        return items.filter(function (item) { return item.nama_pasien.toLowerCase() === param.toLowerCase(); });
    };
    return FilterNamaPasienPipe;
}());
FilterNamaPasienPipe = __decorate([
    core_1.Pipe({
        name: 'filterNamaPasien'
    })
], FilterNamaPasienPipe);
exports.FilterNamaPasienPipe = FilterNamaPasienPipe;
//# sourceMappingURL=filter-nama-pasien.pipe.js.map