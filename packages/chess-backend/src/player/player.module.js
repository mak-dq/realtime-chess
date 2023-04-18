"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlayerModule = void 0;
var common_1 = require("@nestjs/common");
var player_controller_1 = require("./controllers/player/player.controller");
var player_service_1 = require("./services/player/player.service");
var player_entity_1 = require("./models/player.entity");
var typeorm_1 = require("@nestjs/typeorm");
var PlayerModule = /** @class */ (function () {
    function PlayerModule() {
    }
    PlayerModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([player_entity_1.PlayerDetailEntity])],
            controllers: [player_controller_1.PlayerController],
            providers: [player_service_1.PlayerService]
        })
    ], PlayerModule);
    return PlayerModule;
}());
exports.PlayerModule = PlayerModule;
