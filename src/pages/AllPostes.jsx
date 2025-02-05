import React, {useState,useEffect}from 'react'
import Container from '../Container/Container'
import Postcard from "../components/Postcard";
import service from '../Appwrite/config_bucket'

function AllPostes() {
    const [posts,setPosts]=useState([])
    useEffect(()=>{},[])

    service.getPosts([]).then((posts)=>
    {
        if(posts)
        {
            setPosts(posts.documents)
        }
    }
    )
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>
                (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <Postcard post={post}/>
                        </div>

                )

                )}
            </div>
        </Container>
      
    </div>
  )
}

export default AllPostes
