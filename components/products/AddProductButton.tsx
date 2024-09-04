"use client"

import { Product } from "@prisma/client"
import { useStore } from "@/src/store"

type AddProductButtonProps = {
    product: Product
}
export default function AddProductButton({product}:AddProductButtonProps) {
    const addToOrder = useStore((state)=> state.addToOrder)
  return (
    <button
    type="button"
    className=" bg-blue-600 hover:bg-blue-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
    onClick={()=>addToOrder(product)} // para agregar a nuestra orden 
  >Agregar</button>
  )
}

