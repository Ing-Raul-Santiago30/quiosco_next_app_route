"use client"
import { useStore } from "@/src/store"
import ProductDetails from "../ProductDetails"
import { useMemo } from "react"
import { formaCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"

export default function OrderSumary() {
  const order = useStore((state)=>state.order) // recuperamos para el carrito 
  const clearOrder = useStore((state)=>state.clearOrder) // liampiamos la order para el carrito 
  const total = useMemo(()=>order.reduce((total,item)=>total +(item.quantity * item.price),0), [order])

  const handleCreateOrder =async (formData: FormData)=>{
   const data= {
    name: formData.get('name'),
    total,
    order
   }
   
   const result = OrderSchema.safeParse(data)
   console.log(result)
   if(!result.success) {
    result.error.issues.forEach((issues)=>{
      toast.error(issues.message)
    })
    return
   }
  

   const response = await createOrder(data)
   if(response?.errors){
    response.errors.forEach((issues)=>{
      toast.error(issues.message)
    })
   }
   // si todo el codigo anterio pasa entonces 
   //se ejecuta este codigo ssi no hay errores en validaciones 
   toast.success  ('Pedido Realizado Correctamente')
   //aqui limpiamos la orden 
   clearOrder()
  }
  return (
    
    <aside className=" lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
        <h1 className=" text-4xl text-center font-black shadow-lg bg-blue-500 rounded">Mi Pedido </h1>
        {order.length === 0 ? <p className=" text-center text-xl font-bold  shadow-lg bg-slate-100 my-10">El Pedido  esta Vacio </p> : (
          <div className="mt-5">
            {order.map(item =>(
              <ProductDetails
              key={item.id}
              item={item}
              
              />
            ))}
            
            {/*aqui va la opcion del total a pagar  */}
            <p className=" text-2xl mt-20 text-center shadow-lg">
              Total a Pagar: {''}
              <span className="font-black">{formaCurrency(total)}</span>
            </p>

            <form
            className=" w-full mt-10 space-y-5 "
            action={handleCreateOrder}
            >
              <input 
              type="text"
              placeholder=" Tu Nombre Aqui.."
              className=" bg-white border border-gray-100 p-2 w-full"
              name="name"
              />
              <input type="submit" 
              className="py-2 rounded uppercase text-white bg-blue-600 hover:bg-blue-900 w-full text-center cursor-pointer font-bold"
              value='Confirmar pedido'
              
              />

            </form>
            
          </div>

        )}
    </aside>
  )
}
