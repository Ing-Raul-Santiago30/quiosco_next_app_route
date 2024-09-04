import { formaCurrency, getImagePath } from "@/src/utils"; // Importa una función para formatear el precio como moneda
import { Product } from "@prisma/client"; // Importa el tipo `Product` de la base de datos
import Image from "next/image"; // Componente para manejar imágenes optimizadas en Next.js
import AddProductButton from "./AddProductButton"; // Componente para agregar productos al carrito

// Definición del tipo para las propiedades que recibirá el componente `ProductCard`
type ProductCardProps = {
  product: Product; // El componente espera un objeto de tipo `Product`
};

// Componente que renderiza la tarjeta de producto
export default function ProductCard({ product }: ProductCardProps) {
  const imagePath = getImagePath(product.image)
  return (
    <div className="border bg-white"> 
      {/* Contenedor principal de la tarjeta con borde y fondo blanco */}
      <Image
        width={400} // Ancho de la imagen
        height={500} // Alto de la imagen
        src={imagePath} // Ruta de la imagen del producto
        alt={`Imagen Platillo ${product.name}`} // Texto alternativo para la imagen
        quality={100} // Calidad de la imagen (valor de 1 a 100)
      />
      <div className="p-5">
        {/* Contenedor interno con padding para el contenido del producto */}
        <h3 className="text-2xl font-bold">{product.name}</h3> 
        {/* Título del producto con estilo grande y en negrita */}
        <p className="mt-5 font-black text-4xl text-indigo-800">
          {/* Precio del producto, formateado como moneda */}
          {formaCurrency(product.price)}
        </p>
        <AddProductButton 
          product={product} 
        />
        {/* Botón para agregar el producto al carrito de compras */}
      </div>
    </div>
  );
}
