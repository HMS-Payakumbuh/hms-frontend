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
var obat_rusak_service_1 = require("./obat-rusak.service");
var DetailObatRusakComponent = (function () {
    function DetailObatRusakComponent(obatRusakService, route, location) {
        this.obatRusakService = obatRusakService;
        this.route = route;
        this.location = location;
    }
    DetailObatRusakComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.obatRusakService.getObatRusak(+params['id']); })
            .subscribe(function (obatRusak) { return _this.obatRusak = obatRusak; });
    };
    DetailObatRusakComponent.prototype.goBack = function () {
        this.location.back();
    };
    return DetailObatRusakComponent;
}());
DetailObatRusakComponent = __decorate([
    core_1.Component({
        selector: 'detail-obat-rusak-page',
        templateUrl: './detail-obat-rusak.component.html',
        providers: [obat_rusak_service_1.ObatRusakService]
    }),
    __metadata("design:paramtypes", [obat_rusak_service_1.ObatRusakService,
        router_1.ActivatedRoute,
        common_1.Location])
], DetailObatRusakComponent);
exports.DetailObatRusakComponent = DetailObatRusakComponent;
//# sourceMappingURL=detail-obat-rusak.component.js.map