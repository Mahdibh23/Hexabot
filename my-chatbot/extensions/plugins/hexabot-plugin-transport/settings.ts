import { PluginSetting } from '@/plugins/types';
import { SettingType } from '@/setting/schemas/types';

export default [
  {
    label: 'default_message',
    group: 'default',
    type: SettingType.text,
    value: 'Voici les options de transport disponibles :',
  },
  {
    label: 'api_key',
    group: 'api',
    type: SettingType.text,
    value: 'transport', // Remplacez par la clé API ou laissez vide pour la sécurité
  },
  {
    label: 'api_url',
    group: 'api',
    type: SettingType.text,
    value: 'http://localhost:3000/api/transport/search', // Remplacez par l'URL de votre API ou laissez vide pour la configuration
  },
] as const satisfies PluginSetting[];
