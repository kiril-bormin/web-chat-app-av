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

router.post('logout', [SessionController, 'destroy']).use(middleware.auth())
