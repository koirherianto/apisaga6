import type { Topbar } from './types/topbar'
import type { Version } from './types/version'
import type { Language } from './types/language'
import type { Post } from './types/post'

export const topbarsData: Topbar[] = [
  { id: 1, title: 'Docs', slug: 'docs' },
  { id: 2, title: 'Playground', slug: 'playground' },
  { id: 3, title: 'Blog', slug: 'blog' },
  { id: 4, title: 'Tutorial', slug: 'tutorial' },
]

export const versionsData: Version[] = [
  { id: 1, title: 'v3.0.0', slug: 'v3.0.0' },
  { id: 2, title: 'v9.0.0', slug: 'v9.0.0' },
]

export const pagesData: Post[] = [
  {
    id: 0,
    title: 'Start Here',
    slug: 'start-here',
  },
  {
    id: 1,
    title: 'Essentials',
    slug: undefined,
    submenu: [
      {
        id: 2,
        title: 'Installation',
        slug: 'installation',
      },
      {
        id: 3,
        title: 'State',
        slug: 'state',
      },
      {
        id: 4,
        title: 'Templating',
        slug: 'templating',
      },
      {
        id: 5,
        title: 'Events',
        slug: 'events',
      },
    ],
  },
  {
    id: 6,
    title: 'Globals',
    slug: undefined,
    submenu: [
      {
        id: 7,
        title: 'Alpine.data()',
        slug: 'alpine-data',
      },
      {
        id: 8,
        title: 'Alpine.store()',
        slug: 'alpine-store',
      },
      {
        id: 9,
        title: 'Alpine.bind()',
        slug: 'state-bind',
      },
    ],
  },
  {
    id: 10,
    title: 'Upgrade From v2',
    slug: 'upgrade-from-v2',
  },
]

export const languagesData: Language[] = [
  { id: 1, title: 'English', slug: 'english' },
  { id: 2, title: 'Java', slug: 'java' },
  { id: 3, title: 'Java', slug: 'java' },
  { id: 2, title: 'Java', slug: 'java' },
  { id: 2, title: 'Java', slug: 'java' },
  { id: 2, title: 'Java', slug: 'java' },
  { id: 2, title: 'Java', slug: 'java' },
  { id: 2, title: 'Java', slug: 'java' },
  { id: 2, title: 'Java', slug: 'java' },
  { id: 2, title: 'Java', slug: 'java' },
  { id: 2, title: 'Java', slug: 'java' },
  { id: 2, title: 'Java', slug: 'java' },
  { id: 2, title: 'Java', slug: 'java' },
  { id: 2, title: 'Java', slug: 'java' },
  { id: 2, title: 'Java', slug: 'java' },
]
