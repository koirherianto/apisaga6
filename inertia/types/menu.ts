export type Menu = {
  id: number
  title: string
  slug?: string
  selectable?: boolean
  submenu?: Menu[]
}
