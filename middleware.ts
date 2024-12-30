import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req:NextRequest){
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({req, res});
    const{
        data:{session},
    } = await supabase.auth.getSession();
    if(req.nextUrl.pathname.startsWith('/dashboard')){
        if(!session){
            return NextResponse.redirect(new URL('/login',req.url));
        }
    }
    const emailLinkError ='Email link is inavlid or Expired';
    if(req.nextUrl.searchParams.get('error_description')===emailLinkError && 
    req.nextUrl.pathname!=='/signup'){
        return NextResponse.redirect(new URL(`'/signup?erro_description=${req.nextUrl.searchParams.get('error description')}'`,req.url))
    }
    // console.log("hi froom middleware")
    if (['/login', '/signup'].includes(req.nextUrl.pathname)) {
        if (session) {
          return NextResponse.redirect(new URL('/dashboard', req.url));
        }
      }
      return res;
}