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
var TempattidurService = (function () {
    function TempattidurService(http) {
        this.http = http;
        //Mock data
        this.allTempattidur = [
            { no_kamar: 'Anggrek-001', no_tempat_tidur: 1, status: 0 },
            { no_kamar: 'Anggrek-001', no_tempat_tidur: 2, status: 1 },
            { no_kamar: 'Anggrek-001', no_tempat_tidur: 3, status: 1 },
            { no_kamar: 'Anggrek-001', no_tempat_tidur: 4, status: 1 },
            { no_kamar: 'Anggrek-001', no_tempat_tidur: 5, status: 0 },
            { no_kamar: 'Anggrek-001', no_tempat_tidur: 6, status: 1 },
            { no_kamar: 'Anggrek-002', no_tempat_tidur: 1, status: 0 },
            { no_kamar: 'Anggrek-002', no_tempat_tidur: 2, status: 1 },
            { no_kamar: 'Anggrek-002', no_tempat_tidur: 3, status: 1 },
            { no_kamar: 'Anggrek-002', no_tempat_tidur: 4, status: 0 },
            { no_kamar: 'Mawar-001', no_tempat_tidur: 1, status: 1 },
            { no_kamar: 'Mawar-001', no_tempat_tidur: 2, status: 0 },
            { no_kamar: 'Matahari-001', no_tempat_tidur: 1, status: 0 },
        ];
    }
    TempattidurService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    TempattidurService.prototype.getAllTempattidur = function () {
        return Promise.resolve(this.allTempattidur)
            .catch(this.handleError);
    };
    TempattidurService.prototype.getTempattidurByNoKamar = function (no_kamar) {
        return this.getAllTempattidur()
            .then(function (allTempattidur) { return allTempattidur.filter(function (item) {
            return item.no_kamar === no_kamar;
        }); })
            .catch(this.handleError);
    };
    return TempattidurService;
}());
TempattidurService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TempattidurService);
exports.TempattidurService = TempattidurService;
//# sourceMappingURL=tempattidur.service.js.map