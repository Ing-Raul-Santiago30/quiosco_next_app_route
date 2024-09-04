"use client";
import { getImagePath } from '@/src/utils';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useState } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

export default function ImageUpload({image}: {image: string | undefined}) {
  
    // subir la imagen
    const [imageUrl, setImageUrl] = useState('')

  const handleUpload = (result: any) => {
    if (result.event === 'success') {
      console.log(result.info.secure_url);
      // Aquí puedes manejar la URL de la imagen subida, como actualizar el estado o enviar la URL a un servidor
    } else if (result.event === 'error') {
      console.error('Error al subir la imagen:', result);
    }
  };

  return (
    <CldUploadWidget
    onSuccess={(result, {widget})=>{
        if (result.event === 'success') {
            widget.close()
            //@ts-ignore
            setImageUrl(result.info?.secure_url)
        }
    }}
      uploadPreset="mhw5ujpc" // Coloca aquí tu upload preset
      options={{ maxFiles: 1 }}
      onUpload={handleUpload}
     
    >
      {({ open }) => (
        <>
          <div className='space-y-2' onClick={() => open()}>
            <label className='text-slate-800'>Imagen del Producto</label>
            <div className='relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 
            text-neutral-600 bg-slate-100'>
              <TbPhotoPlus size={50} />
              <p className='text-lg'>Agregar Imagen</p>
              {imageUrl && (
                <div className=' absolute inset-0 w-full h-full'>

                    <Image
                    fill
                    style={{objectFit: 'contain'}}
                    src={imageUrl}
                    alt='Imagen de Producto'
                    />

                </div>
              )}
            </div>
          </div>
          {image && !imageUrl && (
            <div className=' space-y-2'>
              <label>Imagen Actual:</label>
              <div className='relative w-64 h-64'>
                <Image
                fill
                src={getImagePath(image)}
                alt='Imagen Producto'
                style={{objectFit: 'contain'}}
                />

              </div>
              
            </div>
          )}
          <input 
          type='hidden'
          name='image'
          defaultValue={imageUrl ? imageUrl : image}

          />
        </>
      )}
    </CldUploadWidget>
  );
}
