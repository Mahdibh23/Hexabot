import { Block } from '@/chat/schemas/block.schema';
import { Context } from '@/chat/schemas/types/context';
import {
  OutgoingMessageFormat,
  StdOutgoingEnvelope,
  StdOutgoingTextEnvelope,
} from '@/chat/schemas/types/message';
import { BlockService } from '@/chat/services/block.service';
import { BaseBlockPlugin } from '@/plugins/base-block-plugin';
import { PluginService } from '@/plugins/plugins.service';
import { PluginBlockTemplate } from '@/plugins/types';
import { SettingService } from '@/setting/services/setting.service';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

import SETTINGS from './settings';

interface TransportPluginArguments {
  start_point?: string;
  end_point?: string;
  date?: string;
}

interface TransportSettings extends Settings {
  default_message: string;
  api_key: string;
  api_url: string;
}

@Injectable()
export class TransportPlugin extends BaseBlockPlugin<typeof SETTINGS> {
  template: PluginBlockTemplate = {
    patterns: ['transport', 'voyage', 'itinéraire'],
    starts_conversation: true,
    name: 'Transport Plugin',
  };

  constructor(
    pluginService: PluginService,
    private readonly blockService: BlockService,
    private readonly settingService: SettingService,
  ) {
    super('transport-plugin', pluginService);
  }

  getPath(): string {
    return __dirname;
  }

  /**
   * Process the plugin logic.
   */
  async process(
    block: Block,
    context: Context,
    _convId: string,
  ): Promise<StdOutgoingEnvelope> {
    try {
      const apiKey = process.env.TRANSPORT_API_KEY || '';
      const apiUrl = process.env.TRANSPORT_API_URL || '';
      if (!apiKey || !apiUrl) {
        throw new Error(
          'API key or API URL is missing. Please check environment variables.',
        );
      }

      const settings =
        (await this.settingService.getSettings()) as unknown as TransportSettings;

      if (!settings || !settings.api_key || !settings.api_url) {
        console.error('API key or API URL is missing in settings:', settings);
        throw new Error(
          'API key or API URL is missing. Please check settings.',
        );
      }

      // Parse plugin arguments
      const args = this.getArguments(block) as TransportPluginArguments;

      // Extract or default the input arguments
      const startPoint =
        context.vars?.depart || args.start_point?.trim() || 'Default Start';
      const endPoint =
        context.vars?.end || args.end_point?.trim() || 'Default End';
      const date =
        context.vars?.date ||
        args.date ||
        new Date().toISOString().split('T')[0];

      if (!startPoint || !endPoint) {
        throw new Error('Start point or end point is missing.');
      }

      console.log(
        `Fetching transport options: ${startPoint} -> ${endPoint} on ${date}`,
      );

      // Fetch transport options
      const transportOptions = await this.fetchTransportOptions(
        settings.api_key,
        settings.api_url,
        startPoint,
        endPoint,
        date,
      );

      // Format the response
      const messageText = `${settings.default_message}\n\n${transportOptions}`;

      // Return the formatted message
      return this.createMessage(messageText, context, settings);
    } catch (error: any) {
      console.error(
        'Error in TransportPlugin.process:',
        error.message || error,
      );
      return this.createMessage(
        'Sorry, an error occurred while retrieving transport data.',
        context,
      );
    }
  }

  /**
   * Fetch transport options from an external API.
   */
  private async fetchTransportOptions(
    apiKey: string,
    apiUrl: string,
    departure: string,
    arrival: string,
    date: string,
  ): Promise<string> {
    try {
      const response = await axios.post(
        apiUrl,
        { departure, arrival, date },
        { headers: { Authorization: `Bearer ${apiKey}` } },
      );

      const options = response.data.results?.map(
        (opt: { type: string; duration: string; price: number }) =>
          `• ${opt.type}: ${opt.duration} - ${opt.price}€`,
      );

      return options?.length
        ? options.join('\n')
        : 'No transport options found for the given parameters.';
    } catch (error: any) {
      console.error(
        'Error while calling the external API:',
        error.message || error,
      );
      throw new Error(
        'Unable to fetch transport options from the external API.',
      );
    }
  }

  /**
   * Create a structured response message.
   */
  private createMessage(
    text: string,
    context: Context,
    settings?: TransportSettings,
  ): StdOutgoingTextEnvelope {
    return {
      format: OutgoingMessageFormat.text,
      message: {
        text: this.blockService.processText(text, context, {}, settings),
      },
    };
  }
}
