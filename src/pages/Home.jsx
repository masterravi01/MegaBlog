import React, { useEffect, useState } from "react";
import storageService from "../appwrite/config";
import { Container, PostCard } from "../components";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    storageService.getPosts().then((data) => setPosts(data.documents));
  }, []);

  return posts?.length > 0 ? (
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
  ) : (
    <Container>No Records Found!</Container>
  );
};

export default Home;
