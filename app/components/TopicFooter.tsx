import { useEffect, useState } from 'react';
import {
  CardFooter,
  ButtonGroup,
  Button,
  Divider,
  Card,
  CardBody,
} from '@nextui-org/react';
import { setUserQualification } from '@/services/setUserQualification';

// FIXME: put this in a centralized location
const difficultyLevels = ['easy', 'medium', 'hard'];

function TopicFooter({
  initialQualification,
  setQualificationOnParent,
  topicId,
  user,
}) {
  const [qualification, setQualification] = useState(
    initialQualification || '',
  );
  const [loading, setLoading] = useState(false);

  useEffect(
    () => setQualification(initialQualification),
    [initialQualification],
  );

  const handleQualificationChange = async event => {
    const newQualification = event.target.textContent.toLowerCase();

    setQualification(newQualification);
    setLoading(true);

    if (!user) {
      alert('You need to be logged in to update your qualification.');
      setLoading(false);
      return;
    }

    try {
      await setUserQualification(user.user_id, topicId, newQualification);
      setQualificationOnParent(newQualification);
    } catch (error) {
      alert('Failed to update qualification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className='mt-10'>
      <CardBody>
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
                onPress={handleQualificationChange}>
                {difficultyLevels[0].toUpperCase()}
              </Button>
              <Button
                className={`text-xs font-bold text-orange-800 bg-orange-200 ${
                  difficultyLevels[1] === qualification
                    ? 'border-orange-400 border-3'
                    : 'border-orange-200 border-3'
                }`}
                onPress={handleQualificationChange}>
                {difficultyLevels[1].toUpperCase()}
              </Button>
              <Button
                className={`text-xs font-bold text-red-800 bg-red-200 ${
                  difficultyLevels[2] === qualification
                    ? 'border-red-400 border-3'
                    : 'border-red-200 border-3'
                }`}
                onPress={handleQualificationChange}>
                {difficultyLevels[2].toUpperCase()}
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default TopicFooter;
