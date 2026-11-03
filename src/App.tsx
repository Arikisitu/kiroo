import React from 'react';
import { FanDeckGenerator } from './components/FanDeckGenerator';

// Kiroo App — Fan Deck Random Topic Generator
// The full-screen fan deck experience is the primary interface.
// The original editorial library (INITIAL_TOPICS, useSavedTopics, etc.) 
// remains intact in src/components and src/data for future extension.

const App: React.FC = () => {
  return <FanDeckGenerator />;
};

export default App;
