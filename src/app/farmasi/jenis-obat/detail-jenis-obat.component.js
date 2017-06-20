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
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var jenis_obat_service_1 = require("./jenis-obat.service");
var DetailJenisObatComponent = (function () {
    function DetailJenisObatComponent(jenisObatService, route, location) {
        this.jenisObatService = jenisObatService;
        this.route = route;
        this.location = location;
    }
    DetailJenisObatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.jenisObatService.getJenisObat(+params['id']); })
            .subscribe(function (jenisObat) { return _this.jenisObat = jenisObat; });
    };
    DetailJenisObatComponent.prototype.goBack = function () {
        this.location.back();
    };
    return DetailJenisObatComponent;
}());
DetailJenisObatComponent = __decorate([
    core_1.Component({
        selector: 'detail-jenis-obat-page',
        templateUrl: './detail-jenis-obat.component.html',
        providers: [jenis_obat_service_1.JenisObatService]
    }),
    __metadata("design:paramtypes", [jenis_obat_service_1.JenisObatService,
        router_1.ActivatedRoute,
        common_1.Location])
], DetailJenisObatComponent);
exports.DetailJenisObatComponent = DetailJenisObatComponent;
//# sourceMappingURL=detail-jenis-obat.component.js.map