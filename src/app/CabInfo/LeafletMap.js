"use client"

import { useEffect, useRef } from "react"

export default function Home() {
  const mapRef = useRef<any>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<any>(null)

  const location = {
    latitude: 19.076,
    longitude: 72.8777,
  }

  const driverName = "Ravi Sharma"
  const cabNumber = "MH12AB1234"

  useEffect(() => {
    if (typeof window === "undefined") return

    if (!window.L) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      document.head.appendChild(link)

      const script = document.createElement("script")
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      script.async = true
      script.onload = initializeMap
      document.body.appendChild(script)
    } else {
      initializeMap()
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current || !markerRef.current || !location) return

    const newPosition = [location.latitude, location.longitude]
    markerRef.current.setLatLng(newPosition)
    mapRef.current.panTo(newPosition)

    markerRef.current.setPopupContent(`
      <div style="color: #333; padding: 8px; min-width: 200px;">
        <strong style="font-size: 14px;">${driverName}</strong><br>
        <div style="margin-top: 5px;">
          <strong>Cab:</strong> ${cabNumber}<br>
          <strong>Current Location:</strong> (${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)})<br>
        </div>
      </div>
    `)
  }, [location.latitude, location.longitude])

  const initializeMap = () => {
    if (!window.L || !mapContainerRef.current) return

    const L = window.L

    if (mapRef.current) {
      mapRef.current.remove()
    }

    const defaultLat = location?.latitude || 16.705
    const defaultLng = location?.longitude || 74.2433

    const map = L.map(mapContainerRef.current).setView([defaultLat, defaultLng], 15)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    const driverIcon = L.icon({
      iconUrl: "https://maps.google.com/mapfiles/ms/micons/cabs.png",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    })

    const marker = L.marker([defaultLat, defaultLng], {
      icon: driverIcon,
    }).addTo(map)

    marker
      .bindPopup(`
      <div style="color: #333; padding: 8px; min-width: 200px;">
        <strong style="font-size: 14px;">${driverName}</strong><br>
        <div style="margin-top: 5px;">
          <strong>Cab:</strong> ${cabNumber}<br>
          <strong>Current Location:</strong> (${defaultLat.toFixed(6)}, ${defaultLng.toFixed(6)})<br>
        </div>
      </div>
    `)
      .openPopup()

    mapRef.current = map
    markerRef.current = marker

    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize()
      }
    }, 100)
  }

  return (
    <main style={{ width: "100%", height: "100vh" }}>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%", minHeight: "400px" }} />
    </main>
  )
}
