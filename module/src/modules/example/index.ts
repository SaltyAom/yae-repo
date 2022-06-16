import type { FastifyPluginCallback } from 'fastify'

import { response } from './services'
import { signUpSchema } from './models'

import type { IdHandler, SignUpHandler } from './types'

const example: FastifyPluginCallback = (app, _, done) => {
    app.get('/', response)

    app.get<IdHandler>('/user/:id', async ({ params: { id } }, res) => id)

    app.post<SignUpHandler>('/signup', async ({ body }) => body)

    done()
}

export default example
