import { NextRequest, NextResponse } from "next/server";
import prisma from "@/configs/prisma";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth";

export async function GET(req: NextRequest, res: NextRequest) {
    const authUser =  await getServerSession(authOptions);
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            phone: true
        },
        where: {
            NOT: {
                id: authUser?.user?.id ? Number(authUser?.user?.id) : undefined
            }
        }
    });
    return NextResponse.json(users);
}