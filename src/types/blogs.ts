export type InsertRecordInput = {
  userId: string;
  authorName: string;
  title: string;
  snippet: string;
  content: string;
  isPublished?: string | boolean;
  publishedAt?: string | number | null;
};

export type InsertBlogModelInput = {
  blogId: string;
  userId: string;
  title: string;
  snippet: string;
  content: string;
  isPublished: boolean;
  publishedAt: number | null;
  author: {
    name: string;
  };
};

export interface Blog extends InsertBlogModelInput {
  createdAt: number;
  updatedAt: number;
}

export type Blogs = Blog[];

export type BlogQueryOutput = Blogs | [];
