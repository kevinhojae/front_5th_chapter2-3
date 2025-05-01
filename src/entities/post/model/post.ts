export type Tag = {
  url: string
  slug: string
  name: string
}

export type Reactions = {
  likes: number
  dislikes: number
}

export type Post = {
  id: number
  title: string
  body: string
  tags: Tag["name"][]
  reactions: Reactions
  views: number
  userId: number
}
