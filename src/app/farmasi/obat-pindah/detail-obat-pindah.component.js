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
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var obat_pindah_service_1 = require("./obat-pindah.service");
var DetailObatPindahComponent = (function () {
    function DetailObatPindahComponent(obatPindahService, route, location) {
        this.obatPindahService = obatPindahService;
        this.route = route;
        this.location = location;
    }
    DetailObatPindahComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.obatPindahService.getObatPindah(+params['id']); })
            .subscribe(function (obatPindah) { return _this.obatPindah = obatPindah; });
    };
    DetailObatPindahComponent.prototype.goBack = function () {
        this.location.back();
    };
    return DetailObatPindahComponent;
}());
DetailObatPindahComponent = __decorate([
    core_1.Component({
        selector: 'detail-obat-pindah-page',
        templateUrl: './detail-obat-pindah.component.html',
        providers: [obat_pindah_service_1.ObatPindahService]
    }),
    __metadata("design:paramtypes", [obat_pindah_service_1.ObatPindahService,
        router_1.ActivatedRoute,
        common_1.Location])
], DetailObatPindahComponent);
exports.DetailObatPindahComponent = DetailObatPindahComponent;
//# sourceMappingURL=detail-obat-pindah.component.js.map