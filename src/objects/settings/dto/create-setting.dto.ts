export class CreateSettingDto {
  id;

  created?: any;

  updated?: any;

  address?: string;
  short_about?: string;
  email?: string[];
  fax?: any[];
  phone?: string[];
  google_url?: string;
  google_embed?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  whatsapp_phone: string;
  main_email: string;
}
