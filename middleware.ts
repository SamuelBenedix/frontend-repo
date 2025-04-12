import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken } from './lib/firebaseAdmin';


const protectedRoutes = ['/dashboard', '/profile', '/main'];

export async function middleware(req: NextRequest) {
 const pathname = req.nextUrl.pathname;

 if (!protectedRoutes.some(route => pathname.startsWith(route))) {
  return NextResponse.next();
 }

 const token = req.cookies.get('token')?.value;

 if (!token) {
  return NextResponse.redirect(new URL('/login', req.url));
 }

 try {
  await verifyIdToken(token);
  return NextResponse.next();
 } catch (err) {
  console.error('Invalid token:', err);
  return NextResponse.redirect(new URL('/login', req.url));
 }
}

export const config = {
 matcher: ['/dashboard/:path*', '/main/:path*', '/profile/:path*'],
};
