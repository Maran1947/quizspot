import { auth } from '@/auth'
import {
    apiAuthPrefix,
    authRoutes,
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes
} from './routes'

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) {
        return
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL('/signin', nextUrl))
    }

    return
})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
