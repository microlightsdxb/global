export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  imageAlt: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  createdAt: string;
  __v: number;
  bannerImage: string;
  bannerImageAlt: string;
  date: string;
}

export interface BlogResponse {
  message: string;
  data: Blog;
}