export type Reactions = {
  likes: number
  dislikes: number
}

export type Tag = string

export type Post = {
  id: string
  title: string
  body: string
  tags: Tag[]
  reactions: Reactions
  views: number
  userId: string
}
