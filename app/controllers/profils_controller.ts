import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { randomUUID } from 'node:crypto'

export default class ProfilsController {
  /**
   * Handle form submission for the edit action
   */
  async edit({ inertia }: HttpContext) {
    return inertia.render('profile/edit', {})
  }
  async update({ request, auth, response }: HttpContext) {
    const user = auth.user!

    // on récupère l'avatar
    const avatar = request.file('avatar', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })
    if (avatar) {
      if (!avatar.isValid) {
        return response.badRequest(avatar.errors)
      }

      // on génère un nom unique pour éviter les conflits
      const fileName = `${randomUUID()}.${avatar.extname}`

      // on déplace le fichier dans public/uploads/avatars
      await avatar.move(app.makePath('public/uploads/avatars'), {
        name: fileName,
      })

      // on enregistre le chemin dans le champ profilePic du modèle User
      user.profilePic = `/uploads/avatars/${fileName}`
      await user.save()
    }

    return response.redirect().back()
  }
}
