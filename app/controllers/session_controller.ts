import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/login', {}) // on demande à inertia d'afficher la page auth/login.vue de vue js
  }

  async store({ request, auth, response }: HttpContext) {
    const { email, password, remember } = request.all() // on récupère toutes les données du formulaire en gardant le mail et le mdp
    const user = await User.verifyCredentials(email, password) // cherche utilisateur par son mail, afin de vérifier si il n'existe déjà

    await auth.use('web').login(user, !!remember) // adonis crée la session statefull (géré par le serveur), !! pour avoir false si null ou undifined
    return response.redirect().toRoute('home') // redirection vers la page home
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout() // on détruit la session actuelle et invalide le cookie
    return response.redirect().toRoute('session.create')
  }
}
