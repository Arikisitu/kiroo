import { useCallback, useEffect, useState } from 'react';
import { getSavedTopics, isTopicSaved, removeSavedTopic, saveTopic } from '../lib/storage';
import type { Topic } from '../types/topic';

export function useSavedTopics() {
  const [savedTopics, setSavedTopics] = useState<Topic[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const list = getSavedTopics();
    setSavedTopics(list);
    setIsLoaded(true);
  }, []);

  const toggleSave = useCallback((topic: Topic): { saved: boolean; message: string } => {
    const isCurrentlySaved = isTopicSaved(topic.id, savedTopics);
    if (isCurrentlySaved) {
      const updated = removeSavedTopic(topic.id);
      setSavedTopics(updated);
      return { saved: false, message: 'Removed from saved topics' };
    } else {
      const res = saveTopic(topic);
      if (res.success) {
        setSavedTopics(getSavedTopics());
        return { saved: true, message: 'Saved to library' };
      }
      return { saved: false, message: 'Could not access storage' };
    }
  }, [savedTopics]);

  const removeTopic = useCallback((topicId: string) => {
    const updated = removeSavedTopic(topicId);
    setSavedTopics(updated);
  }, []);

  const checkIfSaved = useCallback(
    (topicId: string) => {
      return isTopicSaved(topicId, savedTopics);
    },
    [savedTopics]
  );

  return {
    savedTopics,
    isLoaded,
    toggleSave,
    removeTopic,
    checkIfSaved,
  };
}
