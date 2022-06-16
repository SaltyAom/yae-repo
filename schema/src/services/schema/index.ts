import type { onRequestHookHandler } from 'fastify'

import validate from 'fluent-schema-validator'
import type { ObjectSchema } from 'fluent-json-schema'

const validateSchema =
    <T = ObjectSchema>(schema: ObjectSchema): onRequestHookHandler =>
    ({ body }, res, done) => {
        if (!validate(body as T, schema))
            return res.status(401).send({ error: 'Invalid body' })

        done()
    }

export default validateSchema
