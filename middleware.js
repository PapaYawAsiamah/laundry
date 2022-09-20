import { NextResponse } from "next/dist/server/web/spec-extension/response";

export default function middleware(req){
    let verify = req.cookies.get("loggedin");
    let verify2 = req.cookies.get("Emloggedin");
    let url = req.url;
    

    if(!verify && url.includes("/AdminPage")){
        return NextResponse.redirect(new URL('/Admin/AdminLogin', url))
    }

    if(verify && url.includes("/AdminLogin")){
        return NextResponse.redirect(new URL('/Admin/AdminPage', url))
    } else if(verify && url === "http://localhost:3000/"){
        return NextResponse.redirect(new URL('/Admin/AdminPage', url))
    }





    if(!verify2 && url.includes("/EmployeePage")){
        return NextResponse.redirect(new URL('/Employee/EmployeeLogin', url))
    }

    if(verify2 && url.includes("/EmployeeLogin")){
        return NextResponse.redirect( new URL('/Employee/EmployeePage', url))
    }
}