export interface BlogSearchModel {
  kategori_slug?: string;
  page?: number;
  take?: number;
  etiket?: string;
  searchTerm?: string;
  blog_id?: string;
}

export interface KategoriSearchModel {
    ana_kategori?: number | string;
    type?: 'list' | 'all';
    take?: number;
}