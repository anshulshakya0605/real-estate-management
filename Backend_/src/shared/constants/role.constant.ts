export const ROLES = { 
    ADMIN: 'ADMIN',
    EMPLOYEE: 'EMPLOYEE',
    CLIENT: 'CLIENT'
}as const

export type Role = typeof ROLES [keyof typeof ROLES]