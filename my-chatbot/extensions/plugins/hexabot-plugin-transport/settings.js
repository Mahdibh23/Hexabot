"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@/setting/schemas/types");
exports.default = [
    {
        label: 'default_message',
        group: 'default',
        type: types_1.SettingType.text,
        value: 'Voici les options de transport disponibles :',
    },
    {
        label: 'api_key',
        group: 'api',
        type: types_1.SettingType.text,
        value: 'transport',
    },
    {
        label: 'api_url',
        group: 'api',
        type: types_1.SettingType.text,
        value: 'https://localhost:3000/api/transport/search',
    },
];
//# sourceMappingURL=settings.js.map