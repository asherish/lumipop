import { useEffect, useRef, useCallback } from 'react'
import { Map as MapLibreMap } from 'maplibre-gl'
import { Deck } from '@deck.gl/core'
import { H3HexagonLayer } from '@deck.gl/geo-layers'
import { ScatterplotLayer } from '@deck.gl/layers'
import { useAppStore } from '@/stores/appStore'
import type { H3Data, CityData } from '@/types'
import 'maplibre-gl/dist/maplibre-gl.css'

// Demo H3 data (Tokyo area)
const demoH3Data: H3Data[] = [
  { h3Index: '882830829bfffff', nightLight: 85, population: 450000, lat: 35.6762, lng: 139.6503 },
  { h3Index: '88283082d7fffff', nightLight: 92, population: 520000, lat: 35.6895, lng: 139.6917 },
  { h3Index: '88283082dbfffff', nightLight: 78, population: 380000, lat: 35.7090, lng: 139.7320 },
  { h3Index: '882830828bfffff', nightLight: 65, population: 280000, lat: 35.6580, lng: 139.7514 },
  { h3Index: '8828308283fffff', nightLight: 88, population: 490000, lat: 35.7295, lng: 139.7109 },
]

// Demo city data
const demoCityData: CityData[] = [
  { id: '1', name: 'Tokyo', country: 'Japan', nightLight: 95, population: 13960000, lat: 35.6762, lng: 139.6503 },
  { id: '2', name: 'Osaka', country: 'Japan', nightLight: 88, population: 2750000, lat: 34.6937, lng: 135.5023 },
  { id: '3', name: 'Nagoya', country: 'Japan', nightLight: 82, population: 2320000, lat: 35.1815, lng: 136.9066 },
  { id: '4', name: 'Sapporo', country: 'Japan', nightLight: 72, population: 1970000, lat: 43.0618, lng: 141.3545 },
  { id: '5', name: 'Fukuoka', country: 'Japan', nightLight: 75, population: 1600000, lat: 33.5904, lng: 130.4017 },
]

// Dark map style (free, no API key required)
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'

export function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapLibreMap | null>(null)
  const deckRef = useRef<Deck | null>(null)

  const { spatialUnit, showNightLight, viewState, setViewState, setSelectedRegion } = useAppStore()

  const getLayers = useCallback(() => {
    const layers = []

    if (spatialUnit === 'h3' && showNightLight) {
      layers.push(
        new H3HexagonLayer<H3Data>({
          id: 'h3-layer',
          data: demoH3Data,
          pickable: true,
          filled: true,
          extruded: false,
          getHexagon: (d) => d.h3Index,
          getFillColor: (d) => {
            const intensity = d.nightLight / 100
            return [255, 255 * (1 - intensity * 0.5), 0, 180]
          },
          getLineColor: [255, 255, 255, 50],
          lineWidthMinPixels: 1,
          onClick: ({ object }) => {
            if (object) {
              setSelectedRegion(object)
            }
          },
        })
      )
    }

    if (spatialUnit === 'city' && showNightLight) {
      layers.push(
        new ScatterplotLayer<CityData>({
          id: 'city-layer',
          data: demoCityData,
          pickable: true,
          opacity: 0.8,
          stroked: true,
          filled: true,
          radiusScale: 1,
          radiusMinPixels: 10,
          radiusMaxPixels: 100,
          getPosition: (d) => [d.lng, d.lat],
          getRadius: (d) => Math.sqrt(d.population) * 5,
          getFillColor: (d) => {
            const intensity = d.nightLight / 100
            return [255, 255 * (1 - intensity * 0.5), 0, 180]
          },
          getLineColor: [255, 255, 255, 100],
          lineWidthMinPixels: 1,
          onClick: ({ object }) => {
            if (object) {
              setSelectedRegion(object)
            }
          },
        })
      )
    }

    return layers
  }, [spatialUnit, showNightLight, setSelectedRegion])

  // Initialize map and deck
  useEffect(() => {
    if (!mapContainer.current) return

    const map = new MapLibreMap({
      container: mapContainer.current,
      style: MAP_STYLE,
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom,
      pitch: viewState.pitch,
      bearing: viewState.bearing,
    })

    const deck = new Deck({
      parent: mapContainer.current,
      initialViewState: viewState,
      controller: true,
      layers: getLayers(),
      onViewStateChange: ({ viewState: newViewState }) => {
        setViewState(newViewState as typeof viewState)
        map.jumpTo({
          center: [newViewState.longitude, newViewState.latitude],
          zoom: newViewState.zoom,
          pitch: newViewState.pitch,
          bearing: newViewState.bearing,
        })
      },
      getTooltip: ({ object }) => {
        if (!object) return null

        if ('h3Index' in object) {
          return {
            html: `
              <div style="padding: 8px; font-size: 12px;">
                <div><strong>H3 Index:</strong> ${object.h3Index}</div>
                <div><strong>Night Light:</strong> ${object.nightLight.toFixed(1)}</div>
                <div><strong>Population:</strong> ${object.population.toLocaleString()}</div>
              </div>
            `,
            style: {
              backgroundColor: '#1e293b',
              color: '#e2e8f0',
              borderRadius: '4px',
              border: '1px solid #334155',
            },
          }
        }

        if ('name' in object) {
          return {
            html: `
              <div style="padding: 8px; font-size: 12px;">
                <div><strong>${object.name}</strong>, ${object.country}</div>
                <div><strong>Night Light:</strong> ${object.nightLight.toFixed(1)}</div>
                <div><strong>Population:</strong> ${object.population.toLocaleString()}</div>
              </div>
            `,
            style: {
              backgroundColor: '#1e293b',
              color: '#e2e8f0',
              borderRadius: '4px',
              border: '1px solid #334155',
            },
          }
        }

        return null
      },
    })

    mapRef.current = map
    deckRef.current = deck

    return () => {
      deck.finalize()
      map.remove()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update layers when data or settings change
  useEffect(() => {
    if (deckRef.current) {
      deckRef.current.setProps({ layers: getLayers() })
    }
  }, [getLayers])

  return (
    <div ref={mapContainer} className="w-full h-full" />
  )
}
