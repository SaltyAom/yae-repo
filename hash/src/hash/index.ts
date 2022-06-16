import { hash as argon2Hash, argon2id } from 'argon2'
import type { Options } from 'argon2'

const {
    env: { salt, pepper }
} = process

if (!salt) throw new Error('Salt is required')
if (!pepper) throw new Error('Pepper is required')

const argon2Config: Options = {
    version: 19,
    type: argon2id,
    hashLength: 32,
    timeCost: 256,
    parallelism: 8,
    memoryCost: 1024 * 16
}

const rawHash = async (value: string, dynamicPepper = '') =>
    await argon2Hash(value, {
        ...argon2Config,
        salt: Buffer.from(salt + dynamicPepper + pepper, 'utf8'),
        raw: true
    })

export const hash = async (value: string, dynamicPepper = '') =>
    await rawHash(value, dynamicPepper).then((v) => v.toString('base64'))

export const verifyHash = async (
    hashValue: string,
    value: string,
    pepper: string
) => hashValue === (await hash(value, pepper))
