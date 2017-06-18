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
var poliklinik_service_1 = require("../layanan/poliklinik.service");
var DaftarAntrianComponent = (function () {
    function DaftarAntrianComponent(route, poliklinikService) {
        this.route = route;
        this.poliklinikService = poliklinikService;
        this.disabilitas = false;
        this.usia = 0;
    }
    DaftarAntrianComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.poliklinikService.getAllPoliklinik()
            .then(function (allPoliklinik) { return _this.allPoliklinik = allPoliklinik; });
    };
    DaftarAntrianComponent.prototype.daftar = function () {
        console.log(this.poliklinik + this.usia + this.disabilitas);
    };
    return DaftarAntrianComponent;
}());
DaftarAntrianComponent = __decorate([
    core_1.Component({
        selector: 'daftar-antrian',
        templateUrl: './daftar-antrian.component.html',
        providers: [
            poliklinik_service_1.PoliklinikService
        ]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        poliklinik_service_1.PoliklinikService])
], DaftarAntrianComponent);
exports.DaftarAntrianComponent = DaftarAntrianComponent;
//# sourceMappingURL=daftar-antrian.component.js.map