import { Roles } from '@/utils/decorators/roles.decorator';
import { Controller, Get, Query } from '@nestjs/common';
import { TransportPlugin } from '@/plugins/hexabot-plugin-transport';

// Assurez-vous que le chemin est correct

@Controller('hexabot-plugin-transport')
export class HexabotPluginTransportController {
  constructor(private readonly transportPlugin: TransportPlugin) {}

  /**
   * Endpoint to get transport options.
   * @param start_point The starting point for the transport query.
   * @param end_point The destination point for the transport query.
   * @param date The travel date.
   */
  @Roles('public')
  @Get('options')
  async getTransportOptions(
    @Query('start_point') start_point: string,
    @Query('end_point') end_point: string,
    @Query('date') date: string,
  ): Promise<string> {
    // Créer les arguments pour appeler le plugin
    const args: TransportPluginArguments = {
      start_point,
      end_point,
      date,
    };

    try {
      // Utiliser le plugin pour obtenir les options de transport
      const block = {}; // Passez un objet Block si nécessaire selon votre logique
      const context = {}; // Créez ou passez un contexte approprié
      const message = await this.transportPlugin.process(
        block as any, // Passer un objet Block valide
        context as any, // Passer un contexte valide
        '',
      );

      return message.message.text; // Retourner la réponse du plugin
    } catch (error) {
      console.error('Error fetching transport options:', error);
      return 'Sorry, an error occurred while retrieving transport data.';
    }
  }
}
