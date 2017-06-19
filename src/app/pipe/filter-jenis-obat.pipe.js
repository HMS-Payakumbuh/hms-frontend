"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FilterJenisObatPipe = (function () {
    function FilterJenisObatPipe() {
    }
    FilterJenisObatPipe.prototype.transform = function (items, param) {
        if (!items || !param) {
            return items;
        }
        return items.filter(function (item) {
            var paramInId = item.id.toString().toLowerCase().indexOf(param.toLowerCase()) > -1;
            var paramInMerek = item.merek.toLowerCase().indexOf(param.toLowerCase()) > -1;
            var paramInGenerik = item.nama_generik.toLowerCase().indexOf(param.toLowerCase()) > -1;
            return paramInId || paramInMerek || paramInGenerik;
        });
    };
    return FilterJenisObatPipe;
}());
FilterJenisObatPipe = __decorate([
    core_1.Pipe({
        name: 'filterJenisObat'
    })
], FilterJenisObatPipe);
exports.FilterJenisObatPipe = FilterJenisObatPipe;
//# sourceMappingURL=filter-jenis-obat.pipe.js.map