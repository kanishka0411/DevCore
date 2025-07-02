import React, { useState, useCallback, useEffect } from 'react';
import { LandingPage } from './components/Landing/LandingPage';
import { IDEWorkspace } from './components/IDE/IDEWorkspace';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [showLanding, setShowLanding] = useLocalStorage('devcore-show-landing', true);
  const [user, setUser] = useLocalStorage('devcore-user', null);

  const handleGetStarted = useCallback((userData?: any) => {
    if (userData) {
      setUser(userData);
    }
    setShowLanding(false);
  }, [setUser, setShowLanding]);

  const handleBackToLanding = useCallback(() => {
    setShowLanding(true);
  }, [setShowLanding]);

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return (
    <IDEWorkspace 
      user={user} 
      onBackToLanding={handleBackToLanding}
    />
  );
}

export default App;