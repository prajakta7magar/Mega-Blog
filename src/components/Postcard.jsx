import React from 'react'
import Service from '../Appwrite/config_bucket';
import {Link} from 'react-router-dom'

function Postcard({$id,title,featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
    <div className='w-full p-4 rounded-xl bg-gray-100'>
        <div className='w-full mb-4 justify-center'>
           <img src={Service.getFilePreview(featuredImage)} alt={title}
           className='rounded-xl'/>
        </div>
      <h2 className='text-xl font-bold '>{title}</h2>
    </div>
    </Link>
  )
}

export default Postcard
