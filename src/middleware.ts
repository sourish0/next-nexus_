import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
 
export async function middleware(req: NextRequest) {

    const pathname = req.nextUrl.pathname
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    const isAuthenticated = Boolean(token)
    const isPublicPath = pathname === "/" || pathname === "/animal-locator"|| pathname === "/blogs" || pathname === "/doctors" || pathname === "/report-incident" || pathname === "/selectblog"

    if(!isPublicPath && !isAuthenticated) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
}
 
export const config = {
  matcher: [
    "/",
    "/animal-locator",
    "/appointment/:path*",
    "/blogs/:path*",
    "/confirmAppointment/:path*",
    "/createPage",
    "/doctors",
    "/my-appoinments",
    "/report-incident",
    "/selectblog",
  ]
}