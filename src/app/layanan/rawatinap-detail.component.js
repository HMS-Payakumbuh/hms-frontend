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
var transaksi_service_1 = require("../transaksi/transaksi.service");
var rawatinap_service_1 = require("./rawatinap.service");
var tempattidur_service_1 = require("./tempattidur.service");
var RawatinapDetailComponent = (function () {
    function RawatinapDetailComponent(transaksiService, rawatinapService, tempattidurService, route, location) {
        this.transaksiService = transaksiService;
        this.rawatinapService = rawatinapService;
        this.tempattidurService = tempattidurService;
        this.route = route;
        this.location = location;
    }
    RawatinapDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.rawatinapService.getRawatinapByNoKamar(params['noKamar']); })
            .subscribe(function (rawatinap) { return _this.rawatinap = rawatinap; });
        this.route.params
            .subscribe(function (params) {
            _this.noKamar = params['noKamar'];
        });
        this.route.params
            .switchMap(function (params) { return _this.transaksiService.getTransaksi(+params['idTransaksi']); })
            .subscribe(function (transaksi) { return _this.transaksi = transaksi; });
        this.tempattidurService.getTempattidurByNoKamar(this.noKamar)
            .then(function (allTempatTidur) { return _this.allTempatTidur = allTempatTidur; });
    };
    RawatinapDetailComponent.prototype.selectTempatTidur = function (noTempatTidur) {
        if (noTempatTidur === this.selectedTempatTidur)
            this.selectedTempatTidur = 0;
        else
            this.selectedTempatTidur = noTempatTidur;
    };
    RawatinapDetailComponent.prototype.isSelected = function (noTempatTidur) {
        return (this.selectedTempatTidur === noTempatTidur);
    };
    RawatinapDetailComponent.prototype.checkStatus = function (noTempatTidur) {
        return (this.allTempatTidur[noTempatTidur - 1].status === 1);
    };
    RawatinapDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    return RawatinapDetailComponent;
}());
RawatinapDetailComponent = __decorate([
    core_1.Component({
        selector: 'rawatinap-detail-page',
        templateUrl: './rawatinap-detail.component.html',
        providers: [
            rawatinap_service_1.RawatinapService,
            tempattidur_service_1.TempattidurService,
            transaksi_service_1.TransaksiService
        ]
    }),
    __metadata("design:paramtypes", [transaksi_service_1.TransaksiService,
        rawatinap_service_1.RawatinapService,
        tempattidur_service_1.TempattidurService,
        router_1.ActivatedRoute,
        common_1.Location])
], RawatinapDetailComponent);
exports.RawatinapDetailComponent = RawatinapDetailComponent;
//# sourceMappingURL=rawatinap-detail.component.js.map