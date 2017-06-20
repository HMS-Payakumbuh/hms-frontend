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
var _ = require("lodash");
require("rxjs/add/operator/toPromise");
var AsuransiService = (function () {
    function AsuransiService(http) {
        this.http = http;
        //Mock data
        this.allAsuransi = [
            { no_kartu_asuransi: 1231313, nama_asuransi: 'Prudensial', id_pasien: 1 },
            { no_kartu_asuransi: 12313553, nama_asuransi: 'Prudensial', id_pasien: 4 },
            { no_kartu_asuransi: 2124141, nama_asuransi: 'BPJS', id_pasien: 1 },
            { no_kartu_asuransi: 1241241, nama_asuransi: 'BPJS', id_pasien: 2 },
            { no_kartu_asuransi: 1241241, nama_asuransi: 'AIG', id_pasien: 3 }
        ];
    }
    AsuransiService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    AsuransiService.prototype.getAllAsuransi = function () {
        return Promise.resolve(this.allAsuransi)
            .catch(this.handleError);
    };
    AsuransiService.prototype.getAsuransi = function (id) {
        return this.getAllAsuransi()
            .then(function (allAsuransi) {
            return _.filter(allAsuransi, { id_pasien: id });
        })
            .catch(this.handleError);
    };
    return AsuransiService;
}());
AsuransiService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AsuransiService);
exports.AsuransiService = AsuransiService;
//# sourceMappingURL=asuransi.service.js.map