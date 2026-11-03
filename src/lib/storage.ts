import type { Topic } from '../types/topic';

const STORAGE_KEY = 'kiroo_saved_topics_v1';

export const isStorageAvailable = (): boolean => {
  try {
    const testKey = '__kiroo_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

export const getSavedTopics = (): Topic[] => {
  if (!isStorageAvailable()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.warn('Failed to parse saved topics from localStorage:', err);
    return [];
  }
};

export const saveTopic = (topic: Topic): { success: boolean; isDuplicate: boolean; count: number } => {
  if (!isStorageAvailable()) {
    return { success: false, isDuplicate: false, count: 0 };
  }
  try {
    const current = getSavedTopics();
    const exists = current.some((t) => t.id === topic.id || t.title.toLowerCase() === topic.title.toLowerCase());
    if (exists) {
      return { success: true, isDuplicate: true, count: current.length };
    }
    const updated = [topic, ...current];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return { success: true, isDuplicate: false, count: updated.length };
  } catch (err) {
    console.error('Failed to save topic:', err);
    return { success: false, isDuplicate: false, count: 0 };
  }
};

export const removeSavedTopic = (topicId: string): Topic[] => {
  if (!isStorageAvailable()) return [];
  try {
    const current = getSavedTopics();
    const updated = current.filter((t) => t.id !== topicId);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to remove saved topic:', err);
    return [];
  }
};

export const isTopicSaved = (topicId: string, currentSaved: Topic[]): boolean => {
  return currentSaved.some((t) => t.id === topicId);
};
