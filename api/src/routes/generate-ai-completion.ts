import { OpenAIStream, streamToResponse } from 'ai'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { openai } from '@/lib/openai'

export async function generateAICompletionRoute(app: FastifyInstance) {
  app.post('/ai/complete', async (req, res) => {
    const bodySchema = z.object({
      videoId: z.string().uuid(),
      template: z.string(),
      temperature: z.number().min(0).max(1).default(0.5),
    })

    const { videoId, template, temperature } = bodySchema.parse(req.body)

    const video = await prisma.video.findUniqueOrThrow({
      where: { id: videoId },
    })

    if (!video.transcription)
      return res
        .status(400)
        .send({ error: 'Video transcription was not generated yet.' })

    const promptMessage = template.replace(
      '{transcription}',
      video.transcription,
    )

    // sends the prompt to OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // token limit = 4096 tokens (OpenAI Tokenizer)
      temperature,
      messages: [{ role: 'user', content: promptMessage }],
      stream: true,
    })

    // create a stream to keep returning the response as it's generated
    const stream = OpenAIStream(response)
    streamToResponse(stream, res.raw, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      },
    })
  })
}
