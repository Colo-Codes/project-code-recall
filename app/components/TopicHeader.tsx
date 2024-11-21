import { useEffect, useState } from 'react';
import {
  CardHeader,
  Button,
  useDisclosure,
  Card,
  CardBody,
  Divider,
  Tooltip,
} from '@nextui-org/react';
import QuestionModal from './QuestionsModal';
import CompoundedProgressBar from './CompoundedProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import {
  faCode,
  faFile,
  faCircleQuestion as faCircleQuestionSolid,
} from '@fortawesome/free-solid-svg-icons';
import { useQualifications } from '@/context/QualificationContext';

// FIXME: put this in a centralized location
const difficultyLevels = ['easy', 'medium', 'hard'];

function TopicHeader({
  topicIcon,
  title,
  topicArea,
  modalTitle,
  questionsAndAnswers,
  topicQualification,
  userId,
}: {
  topicIcon: React.ReactNode;
  title: string;
  topicArea: string;
  modalTitle: string;
  questionsAndAnswers: {
    id: number;
    question: string;
    answer: { answer: string };
  }[];
  topicQualification: string;
  userId: string;
}) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionElement, setQuestionElement] =
    useState<React.ReactElement | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { questionQualifications, loadQuestionQualifications } =
    useQualifications();

  // Load all qualifications when component mounts
  useEffect(() => {
    if (userId && questionsAndAnswers.length > 0) {
      const questionIds = questionsAndAnswers.map(q => q.id);
      loadQuestionQualifications(userId, questionIds);
    }
  }, [userId, questionsAndAnswers, loadQuestionQualifications]);

  useEffect(() => {
    const currentQuestionId = questionsAndAnswers[questionIndex]?.id;

    if (currentQuestionId) {
      setQuestionElement(
        <QuestionModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          modalTitle={modalTitle}
          questionTitle={questionsAndAnswers[questionIndex]?.question}
          answer={questionsAndAnswers[questionIndex]?.answer}
          lastQuestionIndex={questionsAndAnswers.length - 1}
          setQuestionIndex={setQuestionIndex}
          userId={userId}
          questionId={currentQuestionId}
        />,
      );
    }
  }, [
    isOpen,
    userId,
    onOpenChange,
    modalTitle,
    questionIndex,
    questionsAndAnswers,
    questionQualifications,
  ]);

  // FIXME: make this dynamic
  const difficulties = {
    questions: [5, 3, 2],
    exercises: [2, 4, 4],
  };

  function getDifficultySentence(level: string) {
    if (level === difficultyLevels[0]) {
      return 'You find this topic easy.';
    } else if (level === difficultyLevels[1]) {
      return 'You find this topic moderately challenging.';
    } else if (level === difficultyLevels[2]) {
      return 'You find this topic difficult.';
    } else {
      return "You have not assessed this topic's difficulty yet.";
    }
  }

  function getQuestionSentence(levels: number[]) {
    const [easy, medium, hard] = levels;
    return `You find ${easy} questions easy, ${medium} moderately challenging, and ${hard} difficult.`;
  }

  function getExerciseSentence(levels: number[]) {
    const [easy, medium, hard] = levels;
    return `You find ${easy} exercises easy, ${medium} moderately challenging, and ${hard} difficult.`;
  }

  const progressBarData = [
    {
      type: 'questions',
      icon: (
        <FontAwesomeIcon
          icon={faCircleQuestionSolid}
          className='text-gray-400 mr-2'
        />
      ),
      tooltip: getQuestionSentence(difficulties.questions),
    },
    {
      type: 'exercises',
      icon: <FontAwesomeIcon icon={faCode} className='text-gray-400 mr-2' />,
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

  const topicQualificationIndicator = (
    <Tooltip
      content={getDifficultySentence(topicQualification)}
      delay={0}
      closeDelay={0}
      className='bg-gray-600 text-white'>
      <div
        className={`h-10 min-w-24 rounded-xl flex items-center justify-center ${
          topicQualification === difficultyLevels[0]
            ? 'bg-green-200'
            : topicQualification === difficultyLevels[1]
            ? 'bg-orange-200'
            : topicQualification === difficultyLevels[2]
            ? 'bg-red-200'
            : 'bg-gray-200'
        }`}>
        <span
          className={`text-xs font-bold pointer-events-none ${
            topicQualification === difficultyLevels[0]
              ? 'text-green-800'
              : topicQualification === difficultyLevels[1]
              ? 'text-orange-800'
              : topicQualification === difficultyLevels[2]
              ? 'text-red-800'
              : 'text-gray-800'
          }`}>
          {topicQualification?.toUpperCase() || 'unassessed'.toUpperCase()}
        </span>
      </div>
    </Tooltip>
  );

  return (
    <>
      <div className='w-full mb-6'>
        {/* FIXME: {topicIcon} */}
        <Card>
          <CardBody className='flex flex-col justify-between'>
            <div className='mb-4 mx-auto'>{topicQualificationIndicator}</div>
            <div className='flex flex-col gap-2 m-auto'>{StatusBars}</div>
            <div className='flex flex-col justify-between m-auto'>
              <Divider className='my-4' />
              <Button
                size='sm'
                className='bg-gray-600 text-white w-[188px] mb-4'
                onPress={onOpen}
                startContent={
                  <FontAwesomeIcon
                    icon={faCircleQuestion}
                    className='text-base'
                  />
                }>
                Questions
              </Button>
              <Button
                size='sm'
                className='bg-gray-600 text-white w-[188px]'
                startContent={
                  <FontAwesomeIcon icon={faCode} className='text-base' />
                }>
                Exercises
              </Button>
            </div>
          </CardBody>
        </Card>
        <div className='flex flex-col'>
          <h1 className='font-bold text-[2.5rem] lg:text-5xl'>{title}</h1>
        </div>
      </div>
      {questionElement}
    </>
  );
}

export default TopicHeader;
