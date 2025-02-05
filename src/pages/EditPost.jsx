import React from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import { useState,useEffect } from 'react'
import service from '../Appwrite/config_bucket'
import Container from '../Container/Container'
import { Postform } from '../components'

function EditPost() {
    const [post,setPost]=useState(null)
    const {slug}=useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((post)=>
            {
                if(post)
                {
                    setPost(post);
                }
                else
                {
                    navigate('/')
                }
            })
           
        }
    },[slug,navigate])

  return post? (
    <div className='py-8'>
        <Container>
            <Postform post={post}/>
        </Container>
      
    </div>
  
  ) : null
   
}

export default EditPost
