// este archivo lo que hace es que todas las carpetas que esten dentro de order  van a comparit 

import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSumary from "@/components/order/OrderSumary";
import ToastNotification from "@/components/ui/ToastNotification";



// est mismo diseno el children va hacer el contido de cada pagina hijo
export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <>
        <div className=" md:flex">
       <OrderSidebar/>

       <main className=" md:flex-1 md:h-screen md:overflow-y-scroll p-5">
        {children} 
       </main>
       <OrderSumary/>
        </div>
        <ToastNotification/>
        </>

    )

}