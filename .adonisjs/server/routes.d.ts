import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'messages.get_users': { paramsTuple?: []; params?: {} }
    'messages.get_messages': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'messages.send_message': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'profils.edit': { paramsTuple?: []; params?: {} }
    'profils.update': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'messages.get_users': { paramsTuple?: []; params?: {} }
    'messages.get_messages': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'profils.edit': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'messages.get_users': { paramsTuple?: []; params?: {} }
    'messages.get_messages': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
    'profils.edit': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'messages.send_message': { paramsTuple: [ParamValue]; params: {'userId': ParamValue} }
  }
  PATCH: {
    'profils.update': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}