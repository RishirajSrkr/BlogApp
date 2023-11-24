import React, { useState, useEffect } from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../components'

function AllPosts() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        service.getPosts([])
            .then((posts) => {
                if (posts) setPosts(posts.documents)
            })
    }, [])

    //here we pass a empty array because we don't have any query to pass here, else we would have passed a query here.


    return (
            <div className=' w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {posts?.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
    )
}

export default AllPosts