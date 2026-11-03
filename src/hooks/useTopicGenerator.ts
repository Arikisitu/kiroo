import { useCallback, useState } from 'react';
import { generateTopic } from '../lib/generator';
import type { GeneratorOptions, Topic } from '../types/topic';

export function useTopicGenerator(initialTopic?: Topic) {
  const [options, setOptions] = useState<GeneratorOptions>({
    category: 'Any',
    difficulty: 'Intermediate',
    style: 'Deep',
    subject: '',
  });

  const [currentTopic, setCurrentTopic] = useState<Topic | null>(initialTopic || null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const executeGenerate = useCallback(
    async (overrideOptions?: Partial<GeneratorOptions>) => {
      const activeOptions: GeneratorOptions = {
        ...options,
        ...(overrideOptions || {}),
      };

      setIsGenerating(true);
      setAnnouncement('Curating an editorial topic...');

      // Subtle asynchronous breathing room for editorial sensation
      await new Promise((resolve) => setTimeout(resolve, 280));

      try {
        const result = generateTopic(activeOptions);
        setCurrentTopic(result);
        setAnnouncement(`Generated new topic: ${result.title} in category ${result.category}.`);
        return result;
      } catch (err) {
        console.error('Generation error:', err);
        setAnnouncement('Error generating topic.');
        return null;
      } finally {
        setIsGenerating(false);
      }
    },
    [options]
  );

  const setCategory = useCallback((cat: string) => {
    setOptions((prev) => ({ ...prev, category: cat }));
  }, []);

  const setDifficulty = useCallback((diff: GeneratorOptions['difficulty']) => {
    setOptions((prev) => ({ ...prev, difficulty: diff }));
  }, []);

  const setStyle = useCallback((sty: GeneratorOptions['style']) => {
    setOptions((prev) => ({ ...prev, style: sty }));
  }, []);

  const setSubject = useCallback((sub: string) => {
    setOptions((prev) => ({ ...prev, subject: sub }));
  }, []);

  return {
    options,
    currentTopic,
    setCurrentTopic,
    isGenerating,
    announcement,
    executeGenerate,
    setCategory,
    setDifficulty,
    setStyle,
    setSubject,
  };
}
