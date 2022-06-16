import type { RouteShorthandMethod } from 'fastify'

export interface IdParams {
    id: string
}

export interface IdHandler extends RouteShorthandMethod {
    Params: IdParams
}

export interface SignUpInput {
    username: string
    password: string
    email: string
}

export interface SignUpHandler extends RouteShorthandMethod {
    Body: SignUpInput
}
