import Layout from "../components/Layout";
import PostFormCard from "../components/PostFormCard";
import PostCard from "../components/PostCard";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import LoginPage from "./login";
import { UserContext } from "../contexts/UserContext";

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }
    supabase
      .from("profiles")
      .select()
      .eq("id", session.user.id)
      .then((result) => {
        if (result.data.length) {
          setProfile(result.data[0]);
        }
      });
  }, [session?.user?.id]);

  function fetchPosts() {
    supabase
      .from("posts")
      .select("id, content, created_at, profiles(id, avatar, name)")
      .order("created_at", { ascending: false })
      .then((res) => {
        setPosts(res.data);
      });
  }

  if (!session) {
    return <LoginPage />;
  }
  return (
    <Layout>
      <UserContext.Provider value={{ profile }}>
        <PostFormCard onPost={fetchPosts} />
        {posts?.length > 0 &&
          posts.map((post) => <PostCard key={post.created_at} {...post} />)}
      </UserContext.Provider>
    </Layout>
  );
}
