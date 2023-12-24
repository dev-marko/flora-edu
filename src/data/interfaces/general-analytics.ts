import { BookmarksDataDto } from './bookmarks-data-dto';
import { LikesDataDto } from './likes-data-dto';

export interface GeneralAnalytics {
  mostPopularByLikes: string;
  mostPopularByLikesCount: number;
  mostPopularByBookmarks: string;
  mostPopularByBookmarksCount: number;
  mostPopularByNumberOfComments: string;
  mostPopularByNumberOfCommentsCount: number;
  mostPopularByUniqueVisitors: string;
  mostPopularByUniqueVisitorsCount: number;
  likesChartData: LikesDataDto[];
  bookmarksChartData: BookmarksDataDto[];
}
