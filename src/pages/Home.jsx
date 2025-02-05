import React from 'react'
import { useState,useEffect } from 'react'
import Container from '../Container/Container'
import Postcard from "../components/Postcard";
import service from '../Appwrite/config_bucket'

function Home() {
    const [posts,setPosts]=useState([])
    useEffect(()=>{
        service.getPosts().then((posts)=>
            {
               if(posts)
               {
                setPosts(posts.documents)
               }
            })

    },[])

 if(posts.length===0)
 {
    return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    );
}

    return (   
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((posts)=>(
                        <div key={posts.$id} className='p-2 w-1/4'>
                            <Postcard {...posts}/>
                        </div>
                      ))}
                </div>
            </Container>
        </div>
    )
 }


export default Home
