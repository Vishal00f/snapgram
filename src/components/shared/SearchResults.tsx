import { Models } from 'appwrite';
import React from 'react'
import Loader from './Loader';
import PostListGrid from './PostListGrid';
type SearchResultsProps={
    isSearchFetching:boolean;
    searchedPosts:Models.Document[]
}
function SearchResults({isSearchFetching,searchedPosts}:SearchResultsProps) {
    if(isSearchFetching){
        return <Loader/>
    }
    if( searchedPosts && searchedPosts.documents.length>0){
        return (
            <PostListGrid posts={searchedPosts.documents}/>
        )
    }
    return (
    <p className='text-light-4 mt-10 text-center w-full'> No results found</p>
  )
}

export default SearchResults