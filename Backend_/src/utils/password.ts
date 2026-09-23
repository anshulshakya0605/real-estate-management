import bcrypt from 'bcrypt'
import { env } from '../config/env'
import { CONFIG } from '../shared/constants'


export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS)
}

export const comparePassword = async (password: string, passwordHash: string): Promise<boolean> => {
    return bcrypt.compare(password, passwordHash)
}

export const isPasswordStrongEnough = (
    password: string,
): boolean => {
    return (
        password.length >= CONFIG.PASSWORD_MIN_LENGTH &&
        password.length <= CONFIG.PASSWORD_MAX_LENGTH
    );
};