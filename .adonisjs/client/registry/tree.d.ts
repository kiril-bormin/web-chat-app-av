/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
  messages: {
    getUsers: typeof routes['messages.get_users']
    getMessages: typeof routes['messages.get_messages']
    sendMessage: typeof routes['messages.send_message']
  }
}
