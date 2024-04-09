import Loader from "@/components/shared/Loader";
import PostListGrid from "@/components/shared/PostListGrid";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <>
      {currentUser.liked.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}
        <div className="px-10 py-10 flex gap-2">
      <PostListGrid posts={currentUser.liked} showStats={false} />
      </div>
    </>
  );
};

export default LikedPosts;