import { useState, useEffect } from 'react';

import css from "./App.module.css"
import Description from "../Description/Description"
import Options from "../Options/Options";
import Feedback from '../Feedback/Feedback';
import Notification from '../Notification/Notification';

export default function App() {
  const getInitialFeedback = () => {
    const savedFeedback = localStorage.getItem('feedbackData');
    return savedFeedback ? JSON.parse(savedFeedback) : { good: 0, neutral: 0, bad: 0 };
  };

  const [clicks, setClicks] = useState(getInitialFeedback);

  useEffect(() => {
    localStorage.setItem('feedbackData', JSON.stringify(clicks));
  }, [clicks]); 

  const updateFeedback = (feedbackType) => {
    setClicks(prev => {

      if (feedbackType === "reset") {
        return { good: 0, neutral: 0, bad: 0};
      }

      return {
        ...prev,
        [feedbackType]: prev[feedbackType] + 1,
      };
    });
  };

  const totalFeedback = clicks.good + clicks.neutral + clicks.bad;
  const positiveFeedback = clicks.good;
  const positivePercentage = totalFeedback > 0 ? Math.round((positiveFeedback / totalFeedback) * 100) : 0;


  return (
    <div className={css.pad}>
      <Description
        name="Sip Happens Café"
      />

      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
      />

      {totalFeedback > 0 
        ? (<Feedback items={clicks} 
                     totalFeedback={totalFeedback} 
                     positivePercentage={positivePercentage} />)
        : (<Notification message="No feedback yet" />)
      }
    </div>
  );
}