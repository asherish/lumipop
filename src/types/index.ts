export interface H3Data {
  h3Index: string
  nightLight: number
  population: number
  lat: number
  lng: number
}

export interface CityData {
  id: string
  name: string
  country: string
  nightLight: number
  population: number
  lat: number
  lng: number
}

export type SpatialUnit = 'h3' | 'city'

export interface ViewState {
  longitude: number
  latitude: number
  zoom: number
  pitch: number
  bearing: number
}

export interface AppState {
  spatialUnit: SpatialUnit
  showNightLight: boolean
  showPopulation: boolean
  showOutliers: boolean
  selectedRegion: H3Data | CityData | null
  viewState: ViewState
}

export interface StatisticsResult {
  pearson: number
  spearman: number
  rSquared: number
  sampleSize: number
  regression: {
    slope: number
    intercept: number
  }
}
