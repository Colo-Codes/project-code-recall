import { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardBody,
  Divider,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Render markdown tables and special elements
import rehypeRaw from "rehype-raw"; // Render html inside markdown
import TopicHeader from "./TopicHeader";
import TopicFooter from "./TopicFooter";
import articleData from "../db/react.json";
import CodeSnippet from "./CodeSnippet";
import SideNavList from "./SideNavList";

function TopicCard({ topicId, setTopicLength, setTopicOnParent }) {
  const [topic, setTopic] = useState(
    articleData.topics.filter((topic) => topic.id === 1)[0]
  );
  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));

  const handleSetSelectedKeys = (keys) => {
    setSelectedKeys(keys);
  };

  useEffect(() => {
    setTopicLength(articleData.topics.length);
  }, [setTopicLength]);

  useEffect(() => {
    const topic = articleData.topics.filter((topic) => topic.id === topicId)[0];
    setTopic(topic);
    setTopicOnParent(topic);
  }, [topicId]);

  return (
    <div className="flex items-start gap-10">
      <div className="flex flex-col items-center gap-2">
        <TopicHeader
          topicIcon={
            <FontAwesomeIcon className="size-8" icon={faReact} />
          } /* FIXME: make icons dynamic */
          // title={topic.title}
          topicArea={topic.topicArea}
          modalTitle={topic.title}
          questions={topic.questions}
        />
        <SideNavList
          selectedKeys={selectedKeys}
          handleSetSelectedKeys={handleSetSelectedKeys}
        />
      </div>

      <div className="max-w-[700px]">
        <div className="flex flex-col">
          <h1 className="font-bold text-[2.5rem] lg:text-5xl mb-4">
            {topic.title}
          </h1>
        </div>

        <div>
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            className="markdown-article"
            components={{
              pre: ({ children }) => {
                return (
                  <CodeSnippet
                    language={children.props.className
                      .split("language-")
                      .pop()
                      .trim()}
                  >
                    {children.props.children}
                  </CodeSnippet>
                );
              },
            }}
          >
            {topic.content}
          </Markdown>
        </div>
        <TopicFooter />
      </div>
    </div>
  );
}

export default TopicCard;
