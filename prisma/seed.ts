import { createRoom } from "@/libs/firebase/Mutate"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {

    const user = await prisma.user.create({
        data: {
            name: 'Alice',
            email: 'admin@gmail.com',
            phone: '123456789',
            password: await bcrypt.hash('12345678', 10),
        },
    })
}

main()

  .then(async () => {

    await prisma.$disconnect()

  })

  .catch(async (e) => {

    console.error(e)

    await prisma.$disconnect()

    process.exit(1)

  })