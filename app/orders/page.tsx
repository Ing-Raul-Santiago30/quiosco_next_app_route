"use client";

import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import LastestOrderItem from "@/components/order/LastestOrderItem"; // Asegúrate de importar el componente correcto
import { OrderWithProducts } from "@/src/types";

export default function OrdersPage() {
  const url = "orders/api";
  const fetcher = () => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 10000, // Refresca cada 6 segundos
    revalidateOnFocus: false,
  });

  if (isLoading) return <p className="text-center text-4xl mt-4 uppercase font-bold">CARGANDO LISTADO DE ORDENES...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">Error al cargar las órdenes</p>
    );

  return (
    <>
      <h1 className="text-center mt-20 text-6xl font-black bg-blue-600">
        Órdenes Listas
      </h1>

      <Logo />

      {data && data.length ? (
        <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
          {data.map((order) => (
            <LastestOrderItem 
            key={order.id}
             order={order} />
          ))}
        </div>
      ) : (
        <p className="text-center my-10">No Hay Órdenes Listas</p>
      )}
    </>
  );
}
