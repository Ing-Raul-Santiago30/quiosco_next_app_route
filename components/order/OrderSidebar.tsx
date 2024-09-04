
import {prisma} from '@/src/lib/prisma'
import CategoryIcom from '../ui/CategoryIcom'
import Logo from '../ui/Logo'

//obtener datos de una base de datos 
async function getCategories(){
  return  await prisma.category.findMany()

}

export default async function OrderSidebar() {
 const categories = await getCategories()
 

  return (

    <aside className=" md:w-72 md:h-screen bg-white">
      <Logo/>
    <nav className=' mt-10'>
      {categories.map(category =>(
        <CategoryIcom
        key={category.id}
        category={category}
        
        />
      ))}

    </nav>
    </aside>
    
  )
}
