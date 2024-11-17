import { useState } from "react";
import { Card, Divider, ButtonGroup, Button } from "@nextui-org/react";
import {
  ModalFooter,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import {
  faCircleQuestion,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeSnippet from "./CodeSnippet";

function QuestionModal({
  isOpen,
  onOpenChange,
  modalTitle,
  questionTitle,
  answer,
  lastQuestionIndex,
  setQuestionIndex,
}) {
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [previousButtonDisabled, setPreviousButtonDisabled] = useState(true); // FIXME: the initial question should be random

  const handleClickToNextQuestion = () => {
    if (previousButtonDisabled) setPreviousButtonDisabled(false);

    setQuestionIndex((prevQuestion) => {
      const newQuestionIndex = prevQuestion + 1;

      if (newQuestionIndex === lastQuestionIndex) {
        setNextButtonDisabled(true);
      }

      return newQuestionIndex;
    });
  };

  const handleClickToPreviousQuestion = () => {
    if (nextButtonDisabled) setNextButtonDisabled(false);

    setQuestionIndex((prevQuestion) => {
      const newQuestionIndex = prevQuestion - 1;

      if (newQuestionIndex === 0) {
        setPreviousButtonDisabled(true);
      }

      return newQuestionIndex;
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 bg-gray-200">
              {`Questions on ${modalTitle}`}
            </ModalHeader>
            <ModalBody>
              <Accordion isOpen={false}>
                <AccordionItem
                  subtitle="Press to show answer"
                  title={questionTitle}
                  startContent={
                    <FontAwesomeIcon
                      icon={faCircleQuestion}
                      className="size-8 text-gray-200"
                    />
                  }
                >
                  <Card className="p-4">
                    <Markdown
                      remarkPlugins={[remarkGfm]}
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
                      {answer}
                    </Markdown>
                  </Card>
                  <Divider className="my-4" />
                  <div className="flex flex-col w-full justify-center text-center">
                    <p className="mb-4">How did you find this topic?</p>
                    <div className="flex w-full justify-center gap-4">
                      <ButtonGroup>
                        <Button className="bg-green-300" onPress={onClose}>
                          Easy
                        </Button>
                        <Button className="bg-yellow-300" onPress={onClose}>
                          Medium
                        </Button>
                        <Button className="bg-red-300" onPress={onClose}>
                          Hard
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
            </ModalBody>
            <ModalFooter className="bg-gray-50">
              <div className="mr-auto flex gap-4">
                <Button
                  className="size-24 text-gray-500 border-gray-500"
                  variant="bordered"
                  startContent={<FontAwesomeIcon icon={faChevronLeft} />}
                  onClick={handleClickToPreviousQuestion}
                  isDisabled={previousButtonDisabled}
                >
                  Previous
                </Button>
                <Button
                  className="size-24 text-gray-500 border-gray-500"
                  variant="bordered"
                  endContent={<FontAwesomeIcon icon={faChevronRight} />}
                  onClick={handleClickToNextQuestion}
                  isDisabled={nextButtonDisabled}
                >
                  Next
                </Button>
              </div>
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                className="size-16"
              >
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
