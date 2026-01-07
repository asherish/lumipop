import { MapView } from './components/Map/MapView'
import { ControlPanel } from './components/ControlPanel/ControlPanel'
import { StatsPanel } from './components/StatsPanel/StatsPanel'

function App() {
  return (
    <div className="h-full w-full flex flex-col">
      {/* Header */}
      <header className="h-14 bg-slate-900 border-b border-slate-700 flex items-center px-4">
        <h1 className="text-xl font-bold text-white">
          LumiPop
          <span className="text-sm font-normal text-slate-400 ml-2">
            Nighttime Lights & Population
          </span>
        </h1>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Control Panel */}
        <aside className="w-64 bg-slate-800 border-r border-slate-700 p-4 overflow-y-auto">
          <ControlPanel />
        </aside>

        {/* Map */}
        <main className="flex-1 relative">
          <MapView />
        </main>
      </div>

      {/* Stats Panel */}
      <div className="h-64 bg-slate-800 border-t border-slate-700">
        <StatsPanel />
      </div>
    </div>
  )
}

export default App
