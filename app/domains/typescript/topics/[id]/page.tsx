import TopicPage from "@/components/TopicPage";

export default async function Home({ params }) {
  const { id } = await params;

  return <TopicPage id={Number(id)} />;
}
