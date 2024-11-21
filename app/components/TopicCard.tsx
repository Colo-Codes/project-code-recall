import { useEffect, useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Render markdown tables and special elements
import rehypeRaw from 'rehype-raw'; // Render html inside markdown
import TopicHeader from './TopicHeader';
import TopicFooter from './TopicFooter';
import articleData from '../db/react.json';
import CodeSnippet from './CodeSnippet';
import SideNavList from './SideNavList';
import { getUserQualification } from '@/services/getUserQualification';
import { getTopicQuestions } from '@/services/getTopicQuestions';
import { useAuthenticatedUser } from '@/context/AuthContext';

export default function TopicCard({
  topicId,
  setTopicLength,
  setTopicOnParent,
}) {
  const [qualification, setQualification] = useState(null);
  const [topic, setTopic] = useState(
    articleData.topics.filter(topic => topic.id === 1)[0],
  );
  const [selectedKeys, setSelectedKeys] = useState(new Set(['text']));
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const { user } = useAuthenticatedUser();

  useEffect(() => {
    (async function getTopicQualification() {
      if (user?.user_id && topicId) {
        setQualification(await getUserQualification(user.user_id, topicId));
      }
    })();

    (async function getQuestions() {
      const questionsAndAnswersData = await getTopicQuestions(topicId);

      if (questionsAndAnswersData) {
        setQuestionsAndAnswers(questionsAndAnswersData);
      }
    })();
  }, [user, topic]);

  const handleSetSelectedKeys = keys => {
    setSelectedKeys(keys);
  };

  useEffect(() => {
    setTopicLength(articleData.topics.length);
  }, [setTopicLength]);

  useEffect(() => {
    const topic = articleData.topics.filter(topic => topic.id === topicId)[0];
    setTopic(topic);
    setTopicOnParent(topic);
  }, [topicId]);

  return (
    <div className='flex items-start gap-10'>
      <div className='flex flex-col items-center gap-2'>
        <TopicHeader
          topicIcon={
            <FontAwesomeIcon className='size-8' icon={faReact} />
          } /* FIXME: make icons dynamic */
          // title={topic.title}
          topicArea={topic.topicArea}
          modalTitle={topic.title}
          questionsAndAnswers={questionsAndAnswers}
          topicQualification={qualification}
          userId={user?.user_id}
          setQuestionsAndAnswers={setQuestionsAndAnswers}
        />
        <SideNavList
          selectedKeys={selectedKeys}
          handleSetSelectedKeys={handleSetSelectedKeys}
        />
      </div>

      <div className='max-w-[700px]'>
        <div className='flex flex-col'>
          <h1 className='font-bold text-[2.5rem] lg:text-5xl mb-4'>
            {topic.title}
          </h1>
        </div>

        <div>
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            className='markdown-article'
            components={{
              pre: ({ children }) => {
                return (
                  <CodeSnippet
                    language={children.props.className
                      .split('language-')
                      .pop()
                      .trim()}>
                    {children.props.children}
                  </CodeSnippet>
                );
              },
            }}>
            {topic.content}
          </Markdown>
        </div>
        <TopicFooter
          initialQualification={qualification}
          setQualificationOnParent={setQualification}
          topicId={topicId}
          user={user}
        />
      </div>
    </div>
  );
}
