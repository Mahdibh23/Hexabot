import { Block } from '@/chat/schemas/block.schema';
import { Context } from '@/chat/schemas/types/context';
import { StdOutgoingEnvelope } from '@/chat/schemas/types/message';
import { BlockService } from '@/chat/services/block.service';
import { BaseBlockPlugin } from '@/plugins/base-block-plugin';
import { PluginService } from '@/plugins/plugins.service';
import { PluginBlockTemplate } from '@/plugins/types';
import { SettingService } from '@/setting/services/setting.service';
import SETTINGS from './settings';
export declare class TransportPlugin extends BaseBlockPlugin<typeof SETTINGS> {
    private readonly blockService;
    private readonly settingService;
    template: PluginBlockTemplate;
    constructor(pluginService: PluginService, blockService: BlockService, settingService: SettingService);
    getPath(): string;
    process(block: Block, context: Context, _convId: string): Promise<StdOutgoingEnvelope>;
    private fetchTransportOptions;
    private createMessage;
}
