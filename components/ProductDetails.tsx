import { XCircleIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { OrderItem } from "@/src/types";
import { formaCurrency } from "@/src/utils";
import { useStore } from "@/src/store";
import { useMemo } from "react";

type ProductDetailsProps = {
  item: OrderItem;
}

const MIN_ITEMS =1
const MAX_ITEMS =15

export default function ProductDetails({ item }: ProductDetailsProps) {
  const increment = useStore((state) => state.increment); // para incrementar
  const decrement = useStore((state) => state.decrement); // para decrementar
  const removeItem = useStore((state) => state.removeItem); // para decrementar
  const disableDecrementButton = useMemo(() => item.quantity === MIN_ITEMS, [item]); // para que no conteo en negativo
  const disableIcrementButton = useMemo(() => item.quantity === MAX_ITEMS, [item]); // para que no conteo en negativo

  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{item.name} </p>

          <button type="button" onClick={() => removeItem(item.id)}>
            <XCircleIcon className=" text-red-600  h-8 w-8" />
          </button>
        </div>
        <p className="text-2xl text-blue-800 font-black shadow-lg   ">
          {formaCurrency(item.price)}
        </p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
          <button type="button" 
          onClick={() => decrement(item.id)}
          disabled={disableDecrementButton} // le agrega el atributo de disable a ese button 
          className="disabled:opacity-20"
          
          >
            

            <MinusIcon className="h-6 w-6" />
          </button>

          <p className="text-lg font-black ">{item.quantity}</p>

          <button
          type="button"
            onClick={() => increment(item.id)}
            className="disabled:opacity-10"
            disabled={disableIcrementButton}
          >
            {" "}
            {/* para el boton de incrementar  */}
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {""}
          <span className="font-normal">{formaCurrency(item.subtotal)}</span>
        </p>
      </div>
    </div>
  );
}
