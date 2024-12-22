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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HexabotPluginTransportController = void 0;
const roles_decorator_1 = require("@/utils/decorators/roles.decorator");
const common_1 = require("@nestjs/common");
const hexabot_plugin_transport_1 = require("@/plugins/hexabot-plugin-transport");
let HexabotPluginTransportController = class HexabotPluginTransportController {
    constructor(transportPlugin) {
        this.transportPlugin = transportPlugin;
    }
    async getTransportOptions(start_point, end_point, date) {
        const args = {
            start_point,
            end_point,
            date,
        };
        try {
            const block = {};
            const context = {};
            const message = await this.transportPlugin.process(block, context, '');
            return message.message.text;
        }
        catch (error) {
            console.error('Error fetching transport options:', error);
            return 'Sorry, an error occurred while retrieving transport data.';
        }
    }
};
exports.HexabotPluginTransportController = HexabotPluginTransportController;
__decorate([
    (0, roles_decorator_1.Roles)('public'),
    (0, common_1.Get)('options'),
    __param(0, (0, common_1.Query)('start_point')),
    __param(1, (0, common_1.Query)('end_point')),
    __param(2, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], HexabotPluginTransportController.prototype, "getTransportOptions", null);
exports.HexabotPluginTransportController = HexabotPluginTransportController = __decorate([
    (0, common_1.Controller)('hexabot-plugin-transport'),
    __metadata("design:paramtypes", [typeof (_a = typeof hexabot_plugin_transport_1.TransportPlugin !== "undefined" && hexabot_plugin_transport_1.TransportPlugin) === "function" ? _a : Object])
], HexabotPluginTransportController);
//# sourceMappingURL=hexabot-plugin-transport.controller.js.map