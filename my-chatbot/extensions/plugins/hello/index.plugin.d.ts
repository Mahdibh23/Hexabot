import { Block } from '@/chat/schemas/block.schema';
import { Context } from '@/chat/schemas/types/context';
import { BaseBlockPlugin } from '@/plugins/base-block-plugin';
import { PluginService } from '@/plugins/plugins.service';
import { PluginBlockTemplate } from '@/plugins/types';
import SETTINGS from './settings';
export declare class HelloPlugin extends BaseBlockPlugin<typeof SETTINGS> {
    template: PluginBlockTemplate;
    constructor(pluginService: PluginService);
    getPath(): string;
    process(block: Block, _context: Context, _convId: string): Promise<StdOutgoingTextEnvelope>;
}
