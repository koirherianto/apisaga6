export type Post = {
  id?: string | number
  title: string
  slug?: string
  submenu?: Post[]
}

export type ReadPost = {
  category: string
  parent: string
  content: string
  title: string
  slug: string
}
