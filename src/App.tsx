import { useOSStore } from './store/store';
import { BootScreen } from './components/os/BootScreen';
import { Desktop } from './components/os/Desktop';
import { MenuBar } from './components/os/MenuBar';
import { Dock } from './components/os/Dock';
import { WindowManager } from './components/os/WindowManager';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

function App() {
  const { booting } = useOSStore();
  useKeyboardShortcuts();

  if (booting) {
    return <BootScreen />;
  }

  return (
    <Desktop>
      <MenuBar />
      <WindowManager />
      <Dock />
    </Desktop>
  );
}

export default App;
