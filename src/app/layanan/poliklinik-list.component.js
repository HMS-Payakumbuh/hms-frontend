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
var poliklinik_service_1 = require("./poliklinik.service");
var PoliklinikListComponent = (function () {
    function PoliklinikListComponent(poliklinikService) {
        this.poliklinikService = poliklinikService;
    }
    PoliklinikListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.poliklinikService.getAllPoliklinik()
            .then(function (allPoliklinik) { return _this.allPoliklinik = allPoliklinik; });
    };
    return PoliklinikListComponent;
}());
PoliklinikListComponent = __decorate([
    core_1.Component({
        selector: 'poliklinik-list-page',
        templateUrl: './poliklinik-list.component.html',
        providers: [poliklinik_service_1.PoliklinikService]
    }),
    __metadata("design:paramtypes", [poliklinik_service_1.PoliklinikService])
], PoliklinikListComponent);
exports.PoliklinikListComponent = PoliklinikListComponent;
//# sourceMappingURL=poliklinik-list.component.js.map