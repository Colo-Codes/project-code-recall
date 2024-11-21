'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { getQuestionQualifications } from '@/services/getQuestionQualifications';
import { setQuestionQualification } from '@/services/setQuestionQualification';

interface QualificationContextType {
  questionQualifications: Array<{
    question_id: number;
    qualification: string;
  }>;
  updateQuestionQualification: (
    userId: string,
    questionId: number,
    qualification: string,
  ) => Promise<void>;
  loadQuestionQualifications: (
    userId: string,
    questionIds: number[],
  ) => Promise<void>;
}

const QualificationContext = createContext<
  QualificationContextType | undefined
>(undefined);

export function QualificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [questionQualifications, setQuestionQualifications] = useState<
    Array<{
      question_id: number;
      qualification: string;
    }>
  >([]);

  const updateQuestionQualification = async (
    userId: string,
    questionId: number,
    qualification: string,
  ) => {
    try {
      // Update the qualification in the database
      await setQuestionQualification(userId, questionId, qualification);

      // Update the local state
      setQuestionQualifications(prev => {
        const existingIndex = prev.findIndex(q => q.question_id === questionId);
        if (existingIndex >= 0) {
          const newQualifications = [...prev];
          newQualifications[existingIndex] = {
            question_id: questionId,
            qualification,
          };
          return newQualifications;
        }

        // If the question wasn't qualified before, add it to the list
        return [...prev, { question_id: questionId, qualification }];
      });
    } catch (error) {
      console.error('Failed to update qualification:', error);
      throw error;
    }
  };

  // Using useCallback to prevent unnecessary re-renders when used in the
  // dependency array of other hooks (useEffect, useMemo, etc.)
  const loadQuestionQualifications = useCallback(
    async (userId: string, questionIds: number[]) => {
      try {
        const qualifications = await getQuestionQualifications(
          userId,
          questionIds,
        );
        setQuestionQualifications(qualifications || []);
      } catch (error) {
        console.error('Failed to load qualifications:', error);
        throw error;
      }
    },
    [], // No dependencies needed since it only uses external functions
  );

  return (
    <QualificationContext.Provider
      value={{
        questionQualifications,
        updateQuestionQualification,
        loadQuestionQualifications,
      }}>
      {children}
    </QualificationContext.Provider>
  );
}

export function useQualifications() {
  const context = useContext(QualificationContext);
  if (context === undefined) {
    throw new Error(
      'useQualification must be used within a QualificationProvider',
    );
  }
  return context;
}
