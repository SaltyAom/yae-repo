import type { onRequestHookHandler } from 'fastify'

import { verifyToken } from './token'

export const mutateSessionHook: onRequestHookHandler = async (req, res) => {
    const {
        cookies: { accessToken }
    } = req
    if (!accessToken) return

    const { id, exists } = await verifyToken(accessToken)
    if (!exists) return res.unsignCookie('accessToken')

    req.auth = true
    req.userId = +id
}

export const sessionGuardHook: onRequestHookHandler = (req, res, done) => {
    if (!req.auth)
        return res.status(401).send({
            error: 'Unauthorized'
        })

    done()
}
