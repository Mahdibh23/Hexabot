"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HexabotPluginTransportModule = void 0;
const block_service_1 = require("@/chat/services/block.service");
const plugins_service_1 = require("@/plugins/plugins.service");
const setting_service_1 = require("@/setting/services/setting.service");
const common_1 = require("@nestjs/common");
const hexabot_plugin_transport_1 = require("../../extensions/plugins/hexabot-plugin-transport");
const hexabot_plugin_transport_controller_1 = require("./hexabot-plugin-transport/hexabot-plugin-transport.controller");
let HexabotPluginTransportModule = class HexabotPluginTransportModule {
};
exports.HexabotPluginTransportModule = HexabotPluginTransportModule;
exports.HexabotPluginTransportModule = HexabotPluginTransportModule = __decorate([
    (0, common_1.Module)({
        controllers: [hexabot_plugin_transport_controller_1.HexabotPluginTransportController],
        providers: [hexabot_plugin_transport_1.TransportPlugin, block_service_1.BlockService, plugins_service_1.PluginService, setting_service_1.SettingService],
    })
], HexabotPluginTransportModule);
//# sourceMappingURL=hexabot-plugin-transport.module.js.map