import { categories } from "./data/categories";
import { products } from "./data/products";
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        await prisma.category.createMany({
            data: categories
        })

        await prisma.product.createMany({
            data: products
        })
        
    } catch (error) {
        console.log(error)
        
    }
    
}
main()
.then(async()=>{// si todo sale bien entonces esperamos que prisma se desconecte
    await prisma.$disconnect()
})
.catch(async (e)=>{ // en caso de que haya un error pero tambien desconectamos a prisma
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})