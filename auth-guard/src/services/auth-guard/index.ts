import type { onRequestHookHandler } from 'fastify'

// Implement it yourself
const verifyToken = (accessToken: string) => {
    return { id: accessToken, exists: true }
}

export const mutateAuthHook: onRequestHookHandler = async (req, res) => {
    const {
        cookies: { accessToken }
    } = req
    if (!accessToken) return

    const { id, exists } = await verifyToken(accessToken)
    if (!exists) return res.unsignCookie('accessToken')

    req.auth = true
    req.userId = +id
}

export const authGuardHook: onRequestHookHandler = (req, res, done) => {
    if (!req.auth)
        return res.status(401).send({
            error: 'Unauthorized'
        })

    done()
}
