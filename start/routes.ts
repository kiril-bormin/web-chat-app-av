/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import NewAccountController from '#controllers/new_account_controller'
import SessionController from '#controllers/session_controller'

router.on('/').renderInertia('home', {}).as('home')

router.get('signup', [NewAccountController, 'create']).use(middleware.guest())
router.post('signup', [NewAccountController, 'store']).use(middleware.guest())

router.get('login', [SessionController, 'create']).use(middleware.guest())
router.post('login', [SessionController, 'store']).use(middleware.guest())

router
  .group(() => {
    router.post('logout', [controllers.Session, 'destroy'])

    // Chat routes
    router.get('users', [controllers.Messages, 'getUsers'])
    router.get('messages/:userId', [controllers.Messages, 'getMessages'])
    router.post('messages/:userId', [controllers.Messages, 'sendMessage'])
  })
  .use(middleware.auth())
