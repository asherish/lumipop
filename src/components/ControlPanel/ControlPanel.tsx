import { useAppStore } from '@/stores/appStore'
import type { SpatialUnit } from '@/types'

export function ControlPanel() {
  const {
    spatialUnit,
    showNightLight,
    showPopulation,
    showOutliers,
    setSpatialUnit,
    toggleNightLight,
    togglePopulation,
    toggleOutliers,
  } = useAppStore()

  return (
    <div className="space-y-6">
      {/* Spatial Unit Selector */}
      <section>
        <h2 className="text-sm font-semibold text-slate-300 mb-3">Spatial Unit</h2>
        <div className="space-y-2">
          {(['h3', 'city'] as SpatialUnit[]).map((unit) => (
            <label key={unit} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="spatialUnit"
                value={unit}
                checked={spatialUnit === unit}
                onChange={() => setSpatialUnit(unit)}
                className="w-4 h-4 text-blue-500"
              />
              <span className="text-sm text-slate-200">
                {unit === 'h3' ? 'H3 Index' : 'City'}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Layer Toggle */}
      <section>
        <h2 className="text-sm font-semibold text-slate-300 mb-3">Layers</h2>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showNightLight}
              onChange={toggleNightLight}
              className="w-4 h-4 text-blue-500 rounded"
            />
            <span className="text-sm text-slate-200">Nighttime Lights</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showPopulation}
              onChange={togglePopulation}
              className="w-4 h-4 text-blue-500 rounded"
            />
            <span className="text-sm text-slate-200">Population</span>
          </label>
        </div>
      </section>

      {/* Outlier Toggle */}
      <section>
        <h2 className="text-sm font-semibold text-slate-300 mb-3">Outliers</h2>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showOutliers}
            onChange={toggleOutliers}
            className="w-4 h-4 text-blue-500 rounded"
          />
          <span className="text-sm text-slate-200">Show Outliers</span>
        </label>
      </section>

      {/* Legend */}
      <section>
        <h2 className="text-sm font-semibold text-slate-300 mb-3">Legend</h2>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded" />
            <span className="text-slate-300">High Night Light</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded" />
            <span className="text-slate-300">High Population</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded" />
            <span className="text-slate-300">Outlier</span>
          </div>
        </div>
      </section>
    </div>
  )
}
