import { db } from "@/lib/prisma"

export const getProductWithRestaurant = async (productId: string) => {
    const product = await db.product.findUnique({ where: { id: productId }, include: { restaurant: true } })
    return product
}