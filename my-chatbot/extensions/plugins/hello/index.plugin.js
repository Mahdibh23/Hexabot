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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloPlugin = void 0;
const common_1 = require("@nestjs/common");
const message_1 = require("@/chat/schemas/types/message");
const base_block_plugin_1 = require("@/plugins/base-block-plugin");
const plugins_service_1 = require("@/plugins/plugins.service");
let HelloPlugin = class HelloPlugin extends base_block_plugin_1.BaseBlockPlugin {
    constructor(pluginService) {
        super('hello-plugin', pluginService);
        this.template = { name: 'Hello Plugin' };
    }
    getPath() {
        return __dirname;
    }
    async process(block, _context, _convId) {
        const args = this.getArguments(block);
        const envelope = {
            format: message_1.OutgoingMessageFormat.text,
            message: {
                text: args.message,
            },
        };
        return envelope;
    }
};
exports.HelloPlugin = HelloPlugin;
exports.HelloPlugin = HelloPlugin = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof plugins_service_1.PluginService !== "undefined" && plugins_service_1.PluginService) === "function" ? _a : Object])
], HelloPlugin);
//# sourceMappingURL=index.plugin.js.map