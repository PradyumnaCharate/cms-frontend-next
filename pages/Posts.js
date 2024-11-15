"use client"
import Layout from '../components/Layout';

const PostsPage = () => {
  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      <div className="bg-white p-4 rounded shadow-md">
        {/* Sample content */}
        <p>No posts available. Start creating!</p>
      </div>
    </Layout>
  );
};

export default PostsPage;
