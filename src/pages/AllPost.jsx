import React, { useState, useEffect } from "react";
import storageService from "../appwrite/config";
import { PostCard, Container } from "../components";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    storageService.getPosts([]).then((data) => setPosts(data.documents));
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPost;
