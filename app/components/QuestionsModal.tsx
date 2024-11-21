import { useMemo, useState } from 'react';
import { Card, Divider, ButtonGroup, Button } from '@nextui-org/react';
import {
  ModalFooter,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Accordion,
  AccordionItem,
} from '@nextui-org/react';
import {
  faCircleQuestion,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeSnippet from './CodeSnippet';
import { useQualifications } from '@/context/QualificationContext';

// FIXME: put this in a centralized location
const difficultyLevels = ['easy', 'medium', 'hard'];

function QuestionModal({
  isOpen,
  onOpenChange,
  modalTitle,
  questionTitle,
  answer,
  lastQuestionIndex,
  setQuestionIndex,
  userId,
  questionId,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  modalTitle: string;
  questionTitle: string;
  answer: { answer: string };
  lastQuestionIndex: number;
  setQuestionIndex: (index: number | ((prev: number) => number)) => void;
  userId: string | null;
  questionId: number;
}) {
  const [loading, setLoading] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [previousButtonDisabled, setPreviousButtonDisabled] = useState(true); // FIXME: the initial question should be random
  const { questionQualifications, updateQuestionQualification } =
    useQualifications();

  const qualification = useMemo(
    () =>
      questionQualifications.find(q => q.question_id === questionId)
        ?.qualification || '',
    [questionQualifications, questionId],
  );

  const handleClickToNextQuestion = () => {
    if (previousButtonDisabled) setPreviousButtonDisabled(false);

    setQuestionIndex(prevQuestion => {
      const newQuestionIndex = prevQuestion + 1;

      if (newQuestionIndex === lastQuestionIndex) {
        setNextButtonDisabled(true);
      }

      return newQuestionIndex;
    });
  };

  const handleClickToPreviousQuestion = () => {
    if (nextButtonDisabled) setNextButtonDisabled(false);

    setQuestionIndex(prevQuestion => {
      const newQuestionIndex = prevQuestion - 1;

      if (newQuestionIndex === 0) {
        setPreviousButtonDisabled(true);
      }

      return newQuestionIndex;
    });
  };

  const handleQuestionQualificationChange = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (!userId) {
      alert('You need to be logged in to update your qualification.');
      setLoading(false);
      return;
    }

    const newQualification =
      (event.target as HTMLButtonElement).textContent?.toLowerCase() || '';
    setLoading(true);

    try {
      await updateQuestionQualification(userId, questionId, newQualification);
    } catch (error) {
      console.error('Failed to update qualification:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size='2xl'
      backdrop='blur'>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className='flex flex-col gap-1 bg-gray-200'>
              {`Questions on ${modalTitle}`}
            </ModalHeader>
            <ModalBody>
              <Accordion isOpen={false}>
                <AccordionItem
                  subtitle='Press to show answer'
                  title={questionTitle}
                  startContent={
                    <FontAwesomeIcon
                      icon={faCircleQuestion}
                      className='size-8 text-gray-200'
                    />
                  }>
                  <Card className='p-4'>
                    <Markdown
                      remarkPlugins={[remarkGfm]}
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
                      {JSON.stringify(answer?.answer)}
                    </Markdown>
                  </Card>
                  <Divider className='my-4' />
                  <div className='flex flex-col w-full justify-center text-center'>
                    <p className='mb-4'>
                      How would you rate the difficulty of this topic?
                    </p>
                    <div className='flex w-full justify-center gap-4'>
                      <ButtonGroup isDisabled={loading}>
                        <Button
                          className={`text-xs font-bold text-green-800 bg-green-200 ${
                            difficultyLevels[0] === qualification
                              ? 'border-green-400 border-3'
                              : 'border-green-200 border-3'
                          }`}
                          onPress={handleQuestionQualificationChange}>
                          {difficultyLevels[0].toUpperCase()}
                        </Button>
                        <Button
                          className={`text-xs font-bold text-orange-800 bg-orange-200 ${
                            difficultyLevels[1] === qualification
                              ? 'border-orange-400 border-3'
                              : 'border-orange-200 border-3'
                          }`}
                          onPress={handleQuestionQualificationChange}>
                          {difficultyLevels[1].toUpperCase()}
                        </Button>
                        <Button
                          className={`text-xs font-bold text-red-800 bg-red-200 ${
                            difficultyLevels[2] === qualification
                              ? 'border-red-400 border-3'
                              : 'border-red-200 border-3'
                          }`}
                          onPress={handleQuestionQualificationChange}>
                          {difficultyLevels[2].toUpperCase()}
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
            </ModalBody>
            <ModalFooter className='bg-gray-50'>
              <div className='mr-auto flex gap-4'>
                <Button
                  className='size-24 text-gray-500 border-gray-500'
                  variant='bordered'
                  startContent={<FontAwesomeIcon icon={faChevronLeft} />}
                  onClick={handleClickToPreviousQuestion}
                  isDisabled={previousButtonDisabled}>
                  Previous
                </Button>
                <Button
                  className='size-24 text-gray-500 border-gray-500'
                  variant='bordered'
                  endContent={<FontAwesomeIcon icon={faChevronRight} />}
                  onClick={handleClickToNextQuestion}
                  isDisabled={nextButtonDisabled}>
                  Next
                </Button>
              </div>
              <Button
                color='danger'
                variant='light'
                onPress={onClose}
                className='size-16'>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default QuestionModal;
