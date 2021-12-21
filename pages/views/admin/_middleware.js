import { NextResponse, NextFetchEvent, NextRequest } from "next/server";
const jwt = require("jsonwebtoken");

export async function middleware(req, event) {
  const token = req.cookies["access-token"];
  if (!token) return NextResponse.redirect("/");
  const validateToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (validateToken.role == "user")
    return NextResponse.redirect("/views/user/Home");
  if (validateToken.role != "admin") return NextResponse.next();

  NextResponse.next();
}
