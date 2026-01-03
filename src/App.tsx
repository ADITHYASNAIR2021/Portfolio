import { useOSStore } from './store/store';
import { BootScreen } from './components/os/BootScreen';
import { Desktop } from './components/os/Desktop';
import { MenuBar } from './components/os/MenuBar';
import { Dock } from './components/os/Dock';
import { WindowManager } from './components/os/WindowManager';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useMobile } from './hooks/useMobile';
import { useEffect } from 'react';

function App() {
  const { booting, hydrateFiles } = useOSStore();
  const isMobile = useMobile();
  useKeyboardShortcuts();

  useEffect(() => {
    hydrateFiles();
  }, [hydrateFiles]);

  if (booting) {
    return <BootScreen />;
  }

  return (
    <Desktop>
      {!isMobile && <MenuBar />}
      <WindowManager />
      {!isMobile && <Dock />}
    </Desktop>
  );
}

export default App;
