import { QualificationProvider } from '@/context/QualificationContext';
import TopicPage from '@/components/TopicPage';

export default async function Home({ params }) {
  const { id } = await params;

  return (
    <QualificationProvider>
      <TopicPage id={Number(id)} />
    </QualificationProvider>
  );
}
