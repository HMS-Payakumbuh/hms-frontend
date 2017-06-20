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
var pasien_1 = require("./pasien");
var pasien_service_1 = require("./pasien.service");
var asuransi_1 = require("./asuransi");
var asuransi_service_1 = require("./asuransi.service");
var poliklinik_service_1 = require("../layanan/poliklinik.service");
var PasienFormComponent = (function () {
    function PasienFormComponent(route, poliklinikService, pasienService, asuransiService) {
        this.route = route;
        this.poliklinikService = poliklinikService;
        this.pasienService = pasienService;
        this.asuransiService = asuransiService;
        this.submitted = false;
        this.genders = ['Laki-laki', 'Perempuan'];
        this.religions = ['Islam', 'Protestan', 'Katolik', 'Buddha', 'Hindu', 'Konghucu'];
        this.doctors = ['Dr. Juan', 'Dr. Alec', 'Dr. Hans', 'Dr. Kelvin'];
    }
    //pasienAutocompleteConfig: any = {'placeholder': 'Tuliskan nama pasien', 'sourceField': ['nama']};
    PasienFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.poliklinikService.getAllPoliklinik()
            .then(function (allPoliklinik) { return _this.allPoliklinik = allPoliklinik; });
        this.pasien = new pasien_1.Pasien(null, '', '', '', '', '', '');
        this.asuransi = new asuransi_1.Asuransi(null, '', null);
        // this.pasienService.getAllPasien()
        //   .then(allPasien => this.allPasien = allPasien);
    };
    /*pasienSelected(pasien: Pasien) {
      this.pasien = pasien;
      this.asuransiService.getAsuransi(this.pasien.id).then(allAsuransi => this.allAsuransi = allAsuransi);
    }*/
    PasienFormComponent.prototype.searchPasien = function () {
        var _this = this;
        this.pasienService.getPasien(this.search)
            .then(function (allPasien) { return _this.allPasien = allPasien; });
    };
    PasienFormComponent.prototype.selectPasien = function () {
        var _this = this;
        this.asuransiService.getAsuransi(this.pasien.id).then(function (allAsuransi) { return _this.allAsuransi = allAsuransi; });
        this.searchDone = true;
    };
    PasienFormComponent.prototype.customTrackBy = function (index, obj) {
        return index;
    };
    PasienFormComponent.prototype.pakaiAsuransi = function (asuransi) {
        this.asuransi = asuransi;
    };
    PasienFormComponent.prototype.save = function () {
        this.submitted = true;
    };
    return PasienFormComponent;
}());
PasienFormComponent = __decorate([
    core_1.Component({
        selector: 'pasien-form',
        templateUrl: './pasien-form.component.html',
        providers: [
            poliklinik_service_1.PoliklinikService,
            pasien_service_1.PasienService,
            asuransi_service_1.AsuransiService
        ]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        poliklinik_service_1.PoliklinikService,
        pasien_service_1.PasienService,
        asuransi_service_1.AsuransiService])
], PasienFormComponent);
exports.PasienFormComponent = PasienFormComponent;
//# sourceMappingURL=pasien-form.component.js.map