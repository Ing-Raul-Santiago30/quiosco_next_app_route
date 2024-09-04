import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category, // Correcto: el filtro por la categoría
      },
    },
  });
  return products;
}

export default async function OrderPage({
  params,
}: {
  params: { category: string };
}) {
  const products = await getProducts(params.category);

  return (
    <>
      <Heading>
        Elige y Personaliza tu Pedido a Continuacion{" "}
      </Heading>
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4 items-start">
        {products.map((product) => (
          <ProductCard
            key={product.id} // Importante: proporcionar una key única para cada elemento de la lista
            product={product} // Pasar las propiedades del producto al componente ProductCard
          />
        ))}
      </div>
    </>
  );
}
