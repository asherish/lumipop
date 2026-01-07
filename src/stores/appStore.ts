import { create } from 'zustand'
import type { AppState, SpatialUnit, H3Data, CityData, ViewState } from '@/types'

interface AppStore extends AppState {
  setSpatialUnit: (unit: SpatialUnit) => void
  toggleNightLight: () => void
  togglePopulation: () => void
  toggleOutliers: () => void
  setSelectedRegion: (region: H3Data | CityData | null) => void
  setViewState: (viewState: ViewState) => void
}

export const useAppStore = create<AppStore>((set) => ({
  spatialUnit: 'h3',
  showNightLight: true,
  showPopulation: true,
  showOutliers: true,
  selectedRegion: null,
  viewState: {
    longitude: 139.6917,
    latitude: 35.6895,
    zoom: 4,
    pitch: 0,
    bearing: 0,
  },

  setSpatialUnit: (unit) => set({ spatialUnit: unit }),
  toggleNightLight: () => set((state) => ({ showNightLight: !state.showNightLight })),
  togglePopulation: () => set((state) => ({ showPopulation: !state.showPopulation })),
  toggleOutliers: () => set((state) => ({ showOutliers: !state.showOutliers })),
  setSelectedRegion: (region) => set({ selectedRegion: region }),
  setViewState: (viewState) => set({ viewState }),
}))
