import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilsController {
  /**
   * Handle form submission for the edit action
   */
  async edit({ inertia }: HttpContext) {
    return inertia.render('profile/edit', {})
  }
  async update({ request, auth, response }: HttpContext) {
    const user = !auth.user
  }
}
