"use client";

import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import TopicCard from "@/components/TopicCard";
import { BreadcrumbItem } from "@nextui-org/react";
import MainContainer from "./MainContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import Link from "@/components/custom-elements/Link";
import Footer from "@/components/Footer";

export default function TopicPage({ id }) {
  const [topicId, setTopicId] = useState(id);
  const [topicsLength, setTopicLength] = useState(0);
  const [topic, setTopicOnParent] = useState("");

  useEffect(() => {
    setTopicId(id);
  }, [id]);

  return (
    <>
      <Navigation />
      <MainContainer>
        <CustomBreadcrumbs
        // chip={
        //   <Chip size="sm" variant="flat" className="h-8 bg-blue-100">
        //     {topic?.topicArea?.join(" / ")}
        //   </Chip>
        // }
        >
          <BreadcrumbItem>
            <Link href="/" className="text-gray-600 hover:text-black">
              <FontAwesomeIcon icon={faHouse} />
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link
              href="/domains/typescript"
              className="text-gray-600 hover:text-black hover:underline"
            >
              TypeScript
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <span className="font-bold">{topic?.title}</span>
          </BreadcrumbItem>
        </CustomBreadcrumbs>
        <TopicCard
          topicId={topicId}
          setTopicLength={setTopicLength}
          setTopicOnParent={setTopicOnParent}
        />
      </MainContainer>
      <Footer />
    </>
  );
}
