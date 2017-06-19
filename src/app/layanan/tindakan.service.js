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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var TindakanService = (function () {
    function TindakanService(http) {
        this.http = http;
        //Mock data
        this.allTindakanReference = [
            { kode: '17.11', nama: 'LAP DIR ING HERN-GRAFT', harga: 100000 },
            { kode: '17.12', nama: 'LAP INDIR ING HERN-GRAFT', harga: 150000 },
            { kode: '17.13', nama: 'LAP ING HERN-GRAFT NOS', harga: 200000 }
        ];
    }
    TindakanService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    TindakanService.prototype.getAllTindakanReference = function () {
        return Promise.resolve(this.allTindakanReference)
            .catch(this.handleError);
    };
    TindakanService.prototype.getPoliklinik = function (kode) {
        return this.getAllTindakanReference()
            .then(function (allTindakanReference) { return allTindakanReference.find(function (TindakanReference) { return TindakanReference.kode === kode; }); })
            .catch(this.handleError);
    };
    return TindakanService;
}());
TindakanService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TindakanService);
exports.TindakanService = TindakanService;
//# sourceMappingURL=tindakan.service.js.map