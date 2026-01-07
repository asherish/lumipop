import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'

// Demo data for initial display
const demoData = [
  { nightLight: 10, population: 50000, name: 'Area A' },
  { nightLight: 25, population: 120000, name: 'Area B' },
  { nightLight: 45, population: 280000, name: 'Area C' },
  { nightLight: 60, population: 450000, name: 'Area D' },
  { nightLight: 80, population: 800000, name: 'Area E' },
  { nightLight: 95, population: 1200000, name: 'Area F' },
  { nightLight: 15, population: 80000, name: 'Area G' },
  { nightLight: 35, population: 200000, name: 'Area H' },
  { nightLight: 70, population: 600000, name: 'Area I' },
  { nightLight: 50, population: 350000, name: 'Area J' },
]

// Demo statistics
const demoStats = {
  pearson: 0.94,
  spearman: 0.92,
  rSquared: 0.88,
  sampleSize: 10,
}

export function StatsPanel() {
  return (
    <div className="h-full flex p-4 gap-4">
      {/* Scatter Plot */}
      <div className="flex-1 bg-slate-900 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-slate-300 mb-2">
          Night Light vs Population
        </h3>
        <ResponsiveContainer width="100%" height="85%">
          <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              type="number"
              dataKey="nightLight"
              name="Night Light"
              stroke="#94a3b8"
              fontSize={10}
              label={{
                value: 'Night Light Intensity',
                position: 'bottom',
                fill: '#94a3b8',
                fontSize: 10,
              }}
            />
            <YAxis
              type="number"
              dataKey="population"
              name="Population"
              stroke="#94a3b8"
              fontSize={10}
              tickFormatter={(value) =>
                value >= 1000000
                  ? `${(value / 1000000).toFixed(1)}M`
                  : value >= 1000
                  ? `${(value / 1000).toFixed(0)}K`
                  : value
              }
              label={{
                value: 'Population',
                angle: -90,
                position: 'insideLeft',
                fill: '#94a3b8',
                fontSize: 10,
              }}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '4px',
                fontSize: '12px',
              }}
              formatter={(value: number, name: string) => [
                name === 'Population'
                  ? value.toLocaleString()
                  : value.toFixed(1),
                name,
              ]}
            />
            <ReferenceLine
              stroke="#fbbf24"
              strokeDasharray="5 5"
              segment={[
                { x: 0, y: 0 },
                { x: 100, y: 1300000 },
              ]}
            />
            <Scatter
              name="Regions"
              data={demoData}
              fill="#3b82f6"
              opacity={0.7}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Statistics */}
      <div className="w-64 bg-slate-900 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">
          Correlation Metrics
        </h3>
        <div className="space-y-4">
          <div>
            <div className="text-xs text-slate-400">Pearson Correlation</div>
            <div className="text-2xl font-bold text-blue-400">
              {demoStats.pearson.toFixed(3)}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Spearman Correlation</div>
            <div className="text-2xl font-bold text-green-400">
              {demoStats.spearman.toFixed(3)}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400">R² (Coefficient of Determination)</div>
            <div className="text-2xl font-bold text-yellow-400">
              {demoStats.rSquared.toFixed(3)}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Sample Size</div>
            <div className="text-lg font-semibold text-slate-200">
              {demoStats.sampleSize.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
