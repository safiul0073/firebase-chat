import { NextResponse } from "next/server";
import prisma from "@/configs/prisma";
export async function GET() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            phone: true
        }
    });
    return NextResponse.json(users);
}