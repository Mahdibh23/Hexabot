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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportPlugin = void 0;
const message_1 = require("@/chat/schemas/types/message");
const block_service_1 = require("@/chat/services/block.service");
const base_block_plugin_1 = require("@/plugins/base-block-plugin");
const plugins_service_1 = require("@/plugins/plugins.service");
const setting_service_1 = require("@/setting/services/setting.service");
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let TransportPlugin = class TransportPlugin extends base_block_plugin_1.BaseBlockPlugin {
    constructor(pluginService, blockService, settingService) {
        super('transport-plugin', pluginService);
        this.blockService = blockService;
        this.settingService = settingService;
        this.template = {
            patterns: ['transport', 'voyage', 'itinéraire'],
            starts_conversation: true,
            name: 'Transport Plugin',
        };
    }
    getPath() {
        return __dirname;
    }
    async process(block, context, _convId) {
        try {
            const settings = (await this.settingService.getSettings());
            if (!settings || !settings.api_key || !settings.api_url) {
                console.error('API key or API URL is missing:', settings);
                throw new Error('API key or API URL is missing. Please check settings.');
            }
            const args = this.getArguments(block);
            const startPoint = context.vars?.depart || args.start_point?.trim() || 'Default Start';
            const endPoint = context.vars?.end || args.end_point?.trim() || 'Default End';
            const date = context.vars?.date ||
                args.date ||
                new Date().toISOString().split('T')[0];
            console.log(`Fetching transport options: ${startPoint} -> ${endPoint} on ${date}`);
            const transportOptions = await this.fetchTransportOptions(settings.api_key, settings.api_url, startPoint, endPoint, date);
            const messageText = `${settings.default_message}\n\n${transportOptions}`;
            return this.createMessage(messageText, context, settings);
        }
        catch (error) {
            console.error('Error in TransportPlugin.process:', error.message);
            return this.createMessage('Sorry, an error occurred while retrieving transport data.', context);
        }
    }
    async fetchTransportOptions(apiKey, apiUrl, departure, arrival, date) {
        try {
            const response = await axios_1.default.post(apiUrl, {
                departure,
                arrival,
                date,
            }, {
                headers: { Authorization: `Bearer ${apiKey}` },
            });
            const options = response.data.results?.map((opt) => `• ${opt.type}: ${opt.duration} - ${opt.price}€`);
            return options?.length
                ? options.join('\n')
                : 'No transport options found for the given parameters.';
        }
        catch (error) {
            console.error('Error while calling the external API:', error.message);
            throw new Error('API error');
        }
    }
    createMessage(text, context, settings) {
        return {
            format: message_1.OutgoingMessageFormat.text,
            message: {
                text: this.blockService.processText(text, context, {}, settings),
            },
        };
    }
};
exports.TransportPlugin = TransportPlugin;
exports.TransportPlugin = TransportPlugin = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof plugins_service_1.PluginService !== "undefined" && plugins_service_1.PluginService) === "function" ? _a : Object, typeof (_b = typeof block_service_1.BlockService !== "undefined" && block_service_1.BlockService) === "function" ? _b : Object, typeof (_c = typeof setting_service_1.SettingService !== "undefined" && setting_service_1.SettingService) === "function" ? _c : Object])
], TransportPlugin);
//# sourceMappingURL=index.plugin.js.map