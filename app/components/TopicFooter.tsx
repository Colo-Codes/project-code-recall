import {
  CardFooter,
  ButtonGroup,
  Button,
  Divider,
  Card,
  CardBody,
} from "@nextui-org/react";

function TopicFooter() {
  return (
    <Card className="mt-10">
      <CardBody>
        <div className="flex flex-col w-full justify-center text-center">
          <p className="mb-4">How did you find this topic?</p>
          <div className="flex w-full justify-center gap-4">
            <ButtonGroup>
              <Button className="bg-green-200">Easy</Button>
              <Button className="bg-orange-200">Medium</Button>
              <Button className="bg-red-200">Hard</Button>
            </ButtonGroup>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default TopicFooter;
