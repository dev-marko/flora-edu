export interface AuthorDto {
  id: string;
  firstName: string;
  lastName: string;
  authorBiography: string;
  avatarImageUrl?: string;
  createdAt: Date;
  lastModified: Date;
}
