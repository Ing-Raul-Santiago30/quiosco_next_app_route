import { redirect } from "next/navigation";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import ProductSearchForm from "@/components/products/ProductSearchForm";

async function productCount() {
  return await prisma.product.count();
}

// Crear la función para traer los productos
async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;
  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true,
    },
  });
  return products;
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = +searchParams.page || 1;
  const pageSize = 15;

  // Llamamos la función aquí
  const productsData = getProducts(page, pageSize);
  const totalProductsData = productCount();
  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ]);
  const totalPages = Math.ceil(totalProducts / pageSize);

  if (page > totalPages) {
    redirect("/admin/products");
  }

  return (
    <>
      <Heading>Administrar Productos</Heading>
      
      <div className=" flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link
         href={'/admin/products/new'}
         className=" bg-blue-600 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >Crear Producto </Link>

        <ProductSearchForm/>
      </div>

      <ProductTable products={products} />
      <ProductsPagination page={page} totalPages={totalPages} />
    </>
  );
}
