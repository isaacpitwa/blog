import type { NextPage } from 'next';
import PostList from '@/components/PostList';

const Home: NextPage = () => {
  return (
    <div>
      <PostList />
    </div>
  );
};

export default Home;