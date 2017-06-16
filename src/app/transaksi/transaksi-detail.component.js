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
var transaksi_service_1 = require("./transaksi.service");
var TransaksiDetailComponent = (function () {
    function TransaksiDetailComponent(transaksiService, route, location) {
        this.transaksiService = transaksiService;
        this.route = route;
        this.location = location;
    }
    TransaksiDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.transaksiService.getTransaksi(+params['id']); })
            .subscribe(function (transaksi) { return _this.transaksi = transaksi; });
    };
    TransaksiDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    return TransaksiDetailComponent;
}());
TransaksiDetailComponent = __decorate([
    core_1.Component({
        selector: 'transaksi-detail-page',
        templateUrl: './transaksi-detail.component.html',
        providers: [transaksi_service_1.TransaksiService]
    }),
    __metadata("design:paramtypes", [transaksi_service_1.TransaksiService,
        router_1.ActivatedRoute,
        common_1.Location])
], TransaksiDetailComponent);
exports.TransaksiDetailComponent = TransaksiDetailComponent;
//# sourceMappingURL=transaksi-detail.component.js.map