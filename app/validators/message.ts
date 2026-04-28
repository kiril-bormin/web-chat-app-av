import vine from '@vinejs/vine'

export const createMessageValidator = vine.compile(
  vine.object({
    text: vine.string().trim().optional().requiredIfMissing('image'),
    image: vine.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    }).optional(),
  })
)
