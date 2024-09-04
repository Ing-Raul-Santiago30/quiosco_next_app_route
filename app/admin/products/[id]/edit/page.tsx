import EditProductForm from "@/components/products/EditProductForm" // Corregido el nombre del componente
import ProductForm from "@/components/products/ProductForm"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"

async function getProductById(id: number) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })
    if (!product) {
        notFound()
    }
    return product // Retornar el producto para usarlo en EditProductsPage
}

export default async function EditProductsPage({ params }: { params: { id: string } }) {
    const product = await getProductById(+params.id) // Obtener el producto

    if (!product) {
        return null; // Asegurarse de que no se renderice nada si el producto no se encuentra
    }

    return (
        <>
            <Heading>Editar Producto: {product.name}</Heading>
            <GoBackButton/>
       
            <EditProductForm>
                <ProductForm
                product={product}
                />
            </EditProductForm>
        </>
    )
}
