import React, {useEffect, useState} from 'react';
import Providers from './src/navigation';
import {WithSplashScreen} from './src/screens/SplashScreen';

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAppReady(true);
    }, 3000);
  }, []);

  return (
    <WithSplashScreen isAppReady={isAppReady}>
      <Providers />
    </WithSplashScreen>
  );
}
