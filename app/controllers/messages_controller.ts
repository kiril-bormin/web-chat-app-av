import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Message from '#models/message'
import { createMessageValidator } from '#validators/message'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'
import transmit from '@adonisjs/transmit/services/main'

export default class MessagesController {
  /**
   * Get list of users (excluding the current user)
   */
  async getUsers({ auth, response }: HttpContext) {
    const user = auth.user!
    const users = await User.query().whereNot('id', user.id).orderBy('fullName', 'asc')
    return response.ok(users)
  }

  /**
   * Get messages between the current user and another user
   */
  async getMessages({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const { userId: receiverId } = params

    const messages = await Message.query()
      .where((query) => {
        query.where('senderId', user.id).andWhere('receiverId', receiverId)
      })
      .orWhere((query) => {
        query.where('senderId', receiverId).andWhere('receiverId', user.id)
      })
      .orderBy('createdAt', 'asc')

    return response.ok(messages)
  }

  /**
   * Send a message to another user
   */
  async sendMessage({ auth, params, request, response }: HttpContext) {
    const user = auth.user!
    const { userId: receiverId } = params
    const { text, image } = await request.validateUsing(createMessageValidator)

    let imagePath: string | null = null

    if (image) {
      await image.move(app.makePath('public/uploads'), {
        name: `${cuid()}.${image.extname}`,
      })
      imagePath = `/uploads/${image.fileName}`
    }

    const message = await Message.create({
      senderId: user.id,
      receiverId: Number(receiverId),
      text,
      image: imagePath,
    })

    // Broadcast message via real-time (Transmit)
    transmit.broadcast(`chats/${receiverId}`, {
      message,
    })
    
    // Also broadcast to the sender to keep UI in sync across multiple devices
    transmit.broadcast(`chats/${user.id}`, {
      message,
    })

    return response.created(message)
  }
}
