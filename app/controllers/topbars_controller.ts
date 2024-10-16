import Project from '#models/project'
import type { HttpContext } from '@adonisjs/core/http'

export default class TopbarsController {
  async defaultPage({ params, response }: HttpContext) {
    const defaultPage = await this.defaultUrl(
      params.projectSlug,
      params.versionSlug,
      params.topbarSlug
    )

    const url: Array<string> = defaultPage.split('/')

    return response.redirect().toRoute('pages.index', {
      projectSlug: url[0],
      versionSlug: url[1],
      topbarSlug: url[2],
      pageSlug: url[3],
    })
  }

  async defaultUrl(
    projectSlug: string,
    versionSlug?: string,
    topbarSlug?: string
  ): Promise<string> {
    const project = await Project.findByOrFail('slug', projectSlug)

    let rangkaiUrl = projectSlug

    let version
    if (versionSlug) {
      version = await project.related('versions').query().where('slug', versionSlug).firstOrFail()
    } else {
      version = await project.related('versions').query().where('is_default', true).first()

      if (!version) {
        version = await project.related('versions').query().firstOrFail()
      }
    }

    rangkaiUrl += `/${version.slug}`

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

    rangkaiUrl += `/${topbar.slug}`

    let page = await topbar.related('pages').query().where('is_default', true).first()

    if (!page) {
      page = await topbar.related('pages').query().firstOrFail()
    }

    rangkaiUrl += `/${page.slug}`

    return rangkaiUrl
  }
}
