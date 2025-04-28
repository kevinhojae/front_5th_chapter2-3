export type Reactions = {
  likes: number
  dislikes: number
}

export type Post = {
  id: string
  title: string
  body: string
  tags: string[]
  reactions: Reactions
  views: number
  userId: string
}
