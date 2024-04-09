import { useAuthContext } from '@/context/AuthContext'
import { Models } from 'appwrite'
import React from 'react'
import { Link } from 'react-router-dom'
import PostStats from './PostStats'

type PostListGridProps = {
    posts:Models.Document[] ;
    showUser?:boolean;
    showStats?:boolean;
}
function PostListGrid({posts,showUser= true,showStats= true}:PostListGridProps) {
     const {user} = useAuthContext()
     
  return (
    <ul className='grid-container'>
        {posts.map((post)=>(
            <li key={post.$id} className='relative min-w-80 h-80'>
                <Link to={`/posts/${post.$id}`} className='grid-post_link'>
                    <img src={post.imageUrl} alt="post" className='h-full w-full object-cover'/>
                </Link>
                <div className="grid-post_user">
                    {showUser && (
                        <div className="flex items-center justify-start gap-2 flex-1">
                            <img src={post.creator.imageUrl} alt="profile" className='h-8 w-8 rounded-full' />
                            <p className='line-clamp-1'>{post.creator.name}</p>
                        </div>
                    )}
                    {showStats && <PostStats post={post} userId={user.id}/>}
                </div>
             </li>
        ))}
    </ul>
  )
}

export default PostListGrid