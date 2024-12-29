"use client";
import Header from "@/components/landing-page/header";
import React from "react"


const HomePageLayout=({children}:{children:React.ReactNode})=>{
    return(
        <>
        <Header/>
        <main>{children}</main></>

    )
}
export default HomePageLayout