import { PrismaClient } from "@prisma/client";

const prismaclient = () => new PrismaClient();

declare global {
    var prisma: PrismaClient | undefined
}

const prisma = global.prisma || prismaclient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
