"use client"
import { useRouter } from 'next/navigation'

export default function GoBackButton() {
    const router = useRouter()
  return (
    <button
    onClick={()=> router.back()}
    className=" bg-blue-600 hover:bg-gray-600 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
   >Volver Atras</button>
  )
}
