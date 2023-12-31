import { FastifyInstance } from 'fastify'
import { fastifyMultipart } from '@fastify/multipart'
import fs from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util'
import { randomUUID } from 'node:crypto'
import { pipeline } from 'node:stream'
import { prisma } from '@/lib/prisma'

const pump = promisify(pipeline)

export async function uploadVideoRoute(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1_048_576 * 25, // 25mb
    },
  })

  app.post('/videos', async (req, res) => {
    const data = await req.file()

    if (!data) {
      return res.status(400).send({ error: 'Missing file input.' })
    }

    const ext = path.extname(data.filename)

    if (ext !== '.mp3') {
      return res
        .status(400)
        .send({ error: 'Invalid input type, please select a MP3.' })
    }

    // file name without extension
    const fileBaseName = path.basename(data.filename, ext)

    const fileUploadName = `${fileBaseName}-${randomUUID()}${ext}`

    const uploadDestination = path.resolve(
      __dirname,
      '../../tmp',
      fileUploadName,
    )

    // waits for the file to be completely uploaded
    await pump(data.file, fs.createWriteStream(uploadDestination))

    const video = await prisma.video.create({
      data: {
        name: data.filename,
        path: uploadDestination,
      },
    })

    return { video }
  })
}
