export class CreateAboutDto {
  id?: string | number;
  baslik: string;
  icerik: string;
  one_cikan_resim: string;
  durum: boolean;
  kisa_aciklama: string;
  readonly slug: string;
}
