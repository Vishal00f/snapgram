import Loader from '@/components/shared/Loader'
import PostListGrid from '@/components/shared/PostListGrid'
import { useGetCurrentUser } from '@/lib/react-query/queriesAndMutations'
import { Models } from 'appwrite'
import React from 'react'

function Saved() {
  const {data:currentUser,isPending:isLoadingUser} = useGetCurrentUser()
 const savePosts= currentUser?.save.map((savedPost:Models.Document)=>({
    ...savedPost.post,
    creator:{
      imageUrl:currentUser.imageUrl
    }
 }))

  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="/assets/icons/save.svg"
          width={36}
          height={36}
          alt="edit"
          className="invert-white"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-center max-w-5xl gap-9">
          {savePosts.length === 0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <PostListGrid posts={savePosts} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
  
}

export default Saved