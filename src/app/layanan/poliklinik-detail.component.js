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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var transaksi_service_1 = require("../transaksi/transaksi.service");
var poliklinik_service_1 = require("./poliklinik.service");
var tindakan_service_1 = require("./tindakan.service");
var PoliklinikDetailComponent = (function () {
    function PoliklinikDetailComponent(route, formBuilder, transaksiService, poliklinikService, tindakanService) {
        this.route = route;
        this.formBuilder = formBuilder;
        this.transaksiService = transaksiService;
        this.poliklinikService = poliklinikService;
        this.tindakanService = tindakanService;
    }
    PoliklinikDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addForm = this.formBuilder.group({
            resepEntry: this.formBuilder.array([this.initResepEntry()])
        });
        this.route.params
            .switchMap(function (params) { return _this.poliklinikService.getPoliklinik(params['namaPoliklinik']); })
            .subscribe(function (poliklinik) { return _this.poliklinik = poliklinik; });
        this.route.params
            .switchMap(function (params) { return _this.transaksiService.getTransaksi(+params['idTransaksi']); })
            .subscribe(function (transaksi) { return _this.transaksi = transaksi; });
        this.tindakanService.getAllTindakanReference()
            .then(function (allTindakanReference) { return _this.allTindakanReference = allTindakanReference; });
    };
    PoliklinikDetailComponent.prototype.initResepEntry = function () {
        return this.formBuilder.group({
            obatResep: ['', forms_1.Validators.required]
        });
    };
    PoliklinikDetailComponent.prototype.addResepEntry = function () {
        var control = this.addForm.controls['resepEntry'];
        control.push(this.initResepEntry());
    };
    PoliklinikDetailComponent.prototype.removeResepEntry = function (i) {
        var control = this.addForm.controls['resepEntry'];
        control.removeAt(i);
    };
    return PoliklinikDetailComponent;
}());
PoliklinikDetailComponent = __decorate([
    core_1.Component({
        selector: 'poliklinik-detail-page',
        templateUrl: './poliklinik-detail.component.html',
        providers: [
            poliklinik_service_1.PoliklinikService,
            transaksi_service_1.TransaksiService,
            tindakan_service_1.TindakanService
        ]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        forms_1.FormBuilder,
        transaksi_service_1.TransaksiService,
        poliklinik_service_1.PoliklinikService,
        tindakan_service_1.TindakanService])
], PoliklinikDetailComponent);
exports.PoliklinikDetailComponent = PoliklinikDetailComponent;
//# sourceMappingURL=poliklinik-detail.component.js.map