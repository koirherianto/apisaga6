import Page from '#models/page'
import Project from '#models/project'
import Topbar from '#models/topbar'
import Version from '#models/version'
import { marked } from 'marked'
import string from '@adonisjs/core/helpers/string'
import type { HttpContext } from '@adonisjs/core/http'

export default class PagesController {
  async index({ params, view }: HttpContext) {
    const project = await Project.query().where('slug', params.projectSlug).firstOrFail()

    const [version, topbar, pages, currentPage] = await this.pages(
      project,
      params.versionSlug,
      params.topbarSlug,
      params.pageSlug
    )

    currentPage.content = await marked.parse(currentPage.content ?? '')

    return view.render('pages/index', { project, version, topbar, pages, currentPage })
  }

  async store({ session, params, request, response }: HttpContext) {
    const project = await Project.query().where('slug', params.projectSlug).firstOrFail()

    const [version, topbar, pages] = await this.pages(
      project,
      params.versionSlug,
      params.topbarSlug,
      params.pageSlug
    )

    if (request.input('title').length < 4) {
      session.flash('notification', {
        type: 'info',
        message: 'Title must be at least 4 characters',
      })

      return response.redirect().back()
    }

    // check is title already exist
    const isPageExist = await topbar
      .related('pages')
      .query()
      .where('name', request.input('title'))
      .first()

    if (isPageExist) {
      session.flash('notification', {
        type: 'info',
        message: 'Page already exist',
      })

      return response.redirect().back()
    }

    // apakah ada page yang bernama sama
    let lastOrder = 0
    for (const checkPage of pages) {
      if (checkPage.name === request.input('title')) {
        return response.redirect().back()
      }
      if (checkPage.order > lastOrder) {
        lastOrder = checkPage.order
      }
    }

    lastOrder += 1

    const newPage = new Page()
    newPage.name = request.input('title')
    newPage.content = '# Write your content here'
    newPage.isDefault = false
    newPage.order = lastOrder

    await topbar.related('pages').save(newPage)

    return response.redirect().toRoute('pages.editor', {
      projectSlug: project.slug,
      versionSlug: version.slug,
      topbarSlug: topbar.slug,
      pageSlug: newPage.slug,
    })
  }

  async editor({ params, view }: HttpContext) {
    const project = await Project.query().where('slug', params.projectSlug).firstOrFail()

    const [version, topbar, pages, currentPage] = await this.pages(
      project,
      params.versionSlug,
      params.topbarSlug,
      params.pageSlug
    )

    project.title = string.capitalCase(project.title)

    return view.render('pages/editor', { project, version, topbar, pages, currentPage })
  }

  async update({ params, request, response }: HttpContext) {
    const project = await Project.query().where('slug', params.projectSlug).firstOrFail()

    const [version, topbar, , currentPage] = await this.pages(
      project,
      params.versionSlug,
      params.topbarSlug,
      params.pageSlug
    )

    currentPage.content = request.input('content')

    await currentPage.save()

    return response.redirect().toRoute('pages.index', {
      projectSlug: project.slug,
      versionSlug: version.slug,
      topbarSlug: topbar.slug,
      pageSlug: currentPage.slug,
    })
  }

  async updateTitle({ params, request, response }: HttpContext) {
    const project = await Project.query().where('slug', params.projectSlug).firstOrFail()

    const [version, topbar, , currentPage] = await this.pages(
      project,
      params.versionSlug,
      params.topbarSlug,
      params.pageSlug
    )

    const pageWantoUpdate = await Page.query()
      .where('id', request.input('page_id_update'))
      .firstOrFail()

    if (request.input('title_update').length < 4) {
      return response.redirect().back()
    }

    pageWantoUpdate.name = request.input('title_update')

    await pageWantoUpdate.save()

    const newCurrentPage = await Page.findOrFail(currentPage.id)

    return response.redirect().toRoute('pages.editor', {
      projectSlug: project.slug,
      versionSlug: version.slug,
      topbarSlug: topbar.slug,
      pageSlug: newCurrentPage.slug,
    })
  }

  // destroy
  async destroy({ session, params, response, request }: HttpContext) {
    const pageWantToDelete = await Page.query().where('id', request.input('id')).firstOrFail()

    if (pageWantToDelete.isDefault) {
      session.flash('notification', {
        type: 'error',
        message: 'Cannot delete default page',
      })
      return response.redirect().back()
    }

    const project = await Project.query().where('slug', params.projectSlug).firstOrFail()
    const [version, topbar, pages, pageYgLgDibuka] = await this.pages(
      project,
      params.versionSlug,
      params.topbarSlug,
      params.pageSlug // halaman yang user sedang buka
    )

    await pageWantToDelete.delete()

    const halamanYangSamaDidelete = pageWantToDelete.slug === pageYgLgDibuka.slug

    return response.redirect().toRoute('pages.editor', {
      projectSlug: project.slug,
      versionSlug: version.slug,
      topbarSlug: topbar.slug,
      pageSlug: halamanYangSamaDidelete ? pages[0].slug : pageYgLgDibuka.slug,
    })
  }

  private async pages(
    project: Project,
    versionSlug?: string,
    topbarSlug?: string,
    pageSlug?: string
  ): Promise<[Version, Topbar, Page[], Page]> {
    let version
    if (versionSlug) {
      version = await project.related('versions').query().where('slug', versionSlug).firstOrFail()
    } else {
      version = await project.related('versions').query().where('is_default', true).first()

      if (!version) {
        version = await project.related('versions').query().firstOrFail()
      }
    }

    // jika topbar dikirim
    let topbar
    if (topbarSlug) {
      topbar = await version.related('topbars').query().where('slug', topbarSlug).firstOrFail()
    } else {
      topbar = await version.related('topbars').query().where('is_default', true).first()
      if (!topbar) {
        topbar = await version.related('topbars').query().firstOrFail()
      }
    }

    let page
    // dd(pageSlug)
    if (pageSlug) {
      page = await topbar.related('pages').query().where('slug', pageSlug).firstOrFail()
    } else {
      page = await topbar.related('pages').query().where('is_default', true).first()
      if (!page) {
        page = await topbar.related('pages').query().firstOrFail()
      }
    }

    const pages = await topbar.related('pages').query().orderBy('order').exec()

    return [version, topbar, pages, page]
  }
}
