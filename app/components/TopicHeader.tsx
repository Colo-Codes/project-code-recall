import { useEffect, useState } from "react";
import {
  CardHeader,
  Button,
  useDisclosure,
  Card,
  CardBody,
  Divider,
} from "@nextui-org/react";
import QuestionModal from "./QuestionsModal";
import CompoundedProgressBar from "./CompoundedProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import {
  faCode,
  faFile,
  faCircleQuestion as faCircleQuestionSolid,
} from "@fortawesome/free-solid-svg-icons";

function TopicHeader({ topicIcon, title, topicArea, modalTitle, questions }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionElement, setQuestionElement] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    setQuestionElement(
      <QuestionModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        modalTitle={modalTitle}
        questionTitle={questions[questionIndex].question}
        answer={questions[questionIndex].answer}
        lastQuestionIndex={questions.length - 1}
        setQuestionIndex={setQuestionIndex}
      />
    );
  }, [isOpen, onOpenChange, modalTitle, questionIndex, questions]);

  // FIXME: make this dynamic
  const difficultyDescription = ["easy", "medium", "hard"];
  const difficulties = {
    topic: [10, 0, 0],
    questions: [5, 3, 2],
    exercises: [2, 4, 4],
  };

  function getDifficultySentence(level) {
    if (level === "easy") {
      return "You find this topic easy.";
    } else if (level === "medium") {
      return "You find this topic moderately challenging.";
    } else if (level === "hard") {
      return "You find this topic difficult.";
    } else {
      return "You have not assessed this topic's difficulty yet.";
    }
  }

  function getQuestionSentence(levels) {
    const [easy, medium, hard] = levels;
    return `You find ${easy} questions easy, ${medium} moderately challenging, and ${hard} difficult.`;
  }

  function getExerciseSentence(levels) {
    const [easy, medium, hard] = levels;
    return `You find ${easy} exercises easy, ${medium} moderately challenging, and ${hard} difficult.`;
  }

  const progressBarData = [
    {
      type: "topic",
      icon: <FontAwesomeIcon icon={faFile} className="text-gray-400 mr-2" />,
      tooltip: getDifficultySentence(
        difficultyDescription[
          difficulties.topic.indexOf(Math.max(...difficulties.topic))
        ]
      ),
    },
    {
      type: "questions",
      icon: (
        <FontAwesomeIcon
          icon={faCircleQuestionSolid}
          className="text-gray-400 mr-2"
        />
      ),
      tooltip: getQuestionSentence(difficulties.questions),
    },
    {
      type: "exercises",
      icon: <FontAwesomeIcon icon={faCode} className="text-gray-400 mr-2" />,
      tooltip: getExerciseSentence(difficulties.exercises),
    },
  ];

  const StatusBars = progressBarData.map(({ type, icon, tooltip }) => (
    <CompoundedProgressBar
      key={type}
      icon={icon}
      easy={difficulties[type][0]}
      medium={difficulties[type][1]}
      hard={difficulties[type][2]}
      tooltip={tooltip}
    />
  ));

  return (
    <>
      <div className="w-full mb-6">
        {/* FIXME: {topicIcon} */}
        <Card>
          <CardBody className="flex flex-col justify-between">
            <div className="flex flex-col gap-2 m-auto">{StatusBars}</div>
            <div className="flex flex-col justify-between m-auto">
              <Divider className="my-4" />
              <Button
                size="sm"
                className="bg-gray-600 text-white w-[188px] mb-4"
                onPress={onOpen}
                startContent={
                  <FontAwesomeIcon
                    icon={faCircleQuestion}
                    className="text-base"
                  />
                }
              >
                Questions
              </Button>
              <Button
                size="sm"
                className="bg-gray-600 text-white w-[188px]"
                startContent={
                  <FontAwesomeIcon icon={faCode} className="text-base" />
                }
              >
                Exercises
              </Button>
            </div>
          </CardBody>
        </Card>
        <div className="flex flex-col">
          <h1 className="font-bold text-[2.5rem] lg:text-5xl">{title}</h1>
        </div>
      </div>
      {questionElement}
    </>
  );
}

export default TopicHeader;
