import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

// Definición de la interfaz para el estado de la tienda
interface Store {
  order: OrderItem[]; // Lista de elementos en la orden (carrito de compra)
  addToOrder: (product: Product) => void; // Función para agregar un producto al carrito
  increment: (id: Product["id"]) => void; // Función para incrementar la cantidad de un producto en el carrito
  decrement: (id: Product["id"]) => void;
  removeItem:(id: Product["id"]) =>void;
  clearOrder:() =>void
}

// Creación de la tienda usando Zustand
export const useStore = create<Store>((set, get) => ({
  order: [], // Estado inicial del carrito vacío

  // Función para agregar un producto al carrito
  addToOrder: (product) => {
    const { categoryId, image, ...data } = product; // Separamos algunos datos que no necesitamos
    let order: OrderItem[] = [];

    // Lógica para verificar si el producto ya está en el carrito
    if (get().order.find((item) => item.id === product.id)) {
      // Si el producto ya está en el carrito, se actualiza la cantidad y el subtotal
      order = get().order.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1, // Incrementar la cantidad
              subtotal: item.price * (item.quantity + 1), // Recalcular el subtotal
            }
          : item
      ); // Mapeamos los productos para asegurarnos de no duplicarlos en el carrito
    } else {
      // Si el producto no está en el carrito, lo agregamos con cantidad 1 y calculamos el subtotal
      order = [
        ...get().order,
        {
          ...data,
          quantity: 1, // Cantidad inicial
          subtotal: 1 * product.price, // Subtotal inicial
        },
      ];
    }

    // Actualizamos el estado del carrito
    set(() => ({
      order,
    }));
  },

  // Función para incrementar la cantidad de un producto en el carrito
  increment: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1, // Incrementar la cantidad
              subtotal: item.price * (item.quantity + 1), // Recalcular el subtotal
            }
          : item
      ),
    }));
  },

  // aqui el decremental 
  decrement: (id)=>{
    // en este caso vamos a tener logica antes 
    const order = get().order.map(item=> item.id === id ? {
    ...item,
    quantity:item.quantity -1,
    subtotal:item.price * (item.quantity -1) // y le decimos que esta operacion se haga primaero de la resta y que despues multiplique

    }: item)// en caso contrario retornamos el item como esta 
    
    set(()=>({
      order

    }))
  },
  removeItem:(id)=>{
    set((state)=>({
      order: state.order.filter(item => item.id !== id)

    }))
  },
  //LIMPIAMOS LA ORDEN 
  clearOrder: ()=>{
  set(()=> ({
    order: []
  }))
  }
}));
