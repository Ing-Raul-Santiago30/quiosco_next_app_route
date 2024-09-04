"use server"; // Marca esta función como una función del servidor

import { revalidatePath } from 'next/cache';
import { prisma } from "@/src/lib/prisma";
import { OrderIdSchema } from "@/src/schema";

export async function completeOrder(formData: FormData) {
    const data = {
        orderId: formData.get('order_id')
    };

    const result = OrderIdSchema.safeParse(data);

    if (result.success) {
        try {
            await prisma.order.update({
                where: {
                    id: result.data.orderId,
                },
                data: {
                    status: true,
                    orderReadyAt: new Date(Date.now()),
                },
            });

            // Revalida la caché de la ruta /admin/orders
            revalidatePath('/admin/orders');
        } catch (error) {
            console.error("Error al actualizar la orden:", error);
        }
    } else {
        console.error("Error de validación en el ID de la orden:", result.error);
    }
}
