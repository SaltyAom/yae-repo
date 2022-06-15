/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FastifyRequest } from 'fastify'

declare module 'fastify' {
    interface FastifyRequest {
        salt: string
        pepper: string
    }
}
