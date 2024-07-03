import { NextRequest, NextResponse } from "next/server";
import prisma from "@/configs/prisma"
import { z } from "zod";
import { hash } from "bcrypt";

export async function POST(req: NextRequest, res:NextResponse) {
    
    const body = await req.json();
    const schema = z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string().min(10),
        password: z.string().min(6),
    });

    const { name, email, phone, password } = schema.parse(body);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            phone,
            password: await hash(password, 10),
        }
    });

    return NextResponse.json(user);
}