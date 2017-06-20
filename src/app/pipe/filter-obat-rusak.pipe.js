"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var FilterObatRusakPipe = (function () {
    function FilterObatRusakPipe() {
    }
    FilterObatRusakPipe.prototype.transform = function (items, param1, param2) {
        if ((!items || !param1) && (!items || !param2)) {
            return items;
        }
        if ((!items || !param1)) {
            return items.filter(function (item) {
                var param2InKode = item.kode_obat.toString().toLowerCase().indexOf(param2.toLowerCase()) > -1;
                var param2InMerek = item.merek.toLowerCase().indexOf(param2.toLowerCase()) > -1;
                return (param2InKode || param2InMerek);
            });
        }
        if ((!items || !param2)) {
            return items.filter(function (item) { return item.alasan.toLowerCase().indexOf(param1.toLowerCase()) > -1; });
        }
        return items.filter(function (item) {
            var param1InAlasan = item.alasan.toLowerCase().indexOf(param1.toLowerCase()) > -1;
            var param2InKode = item.kode_obat.toString().toLowerCase().indexOf(param2.toLowerCase()) > -1;
            var param2InMerek = item.merek.toLowerCase().indexOf(param2.toLowerCase()) > -1;
            return param1InAlasan && (param2InKode || param2InMerek);
        });
    };
    return FilterObatRusakPipe;
}());
FilterObatRusakPipe = __decorate([
    core_1.Pipe({
        name: 'filterObatRusak'
    })
], FilterObatRusakPipe);
exports.FilterObatRusakPipe = FilterObatRusakPipe;
//# sourceMappingURL=filter-obat-rusak.pipe.js.map