export interface ArticleEditDto {
  id?: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  headerImageUrl: string;
  content: string;
  isNew: boolean;
}
