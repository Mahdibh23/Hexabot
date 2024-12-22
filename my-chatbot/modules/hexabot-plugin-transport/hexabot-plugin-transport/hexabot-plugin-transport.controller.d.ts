import { TransportPlugin } from '@/plugins/hexabot-plugin-transport';
export declare class HexabotPluginTransportController {
    private readonly transportPlugin;
    constructor(transportPlugin: TransportPlugin);
    getTransportOptions(start_point: string, end_point: string, date: string): Promise<string>;
}
