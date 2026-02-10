import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
  return (
    <div className="min-h-screen bg-[#030712] bg-dot-pattern bg-radial-accent flex flex-col lg:flex-row">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;
