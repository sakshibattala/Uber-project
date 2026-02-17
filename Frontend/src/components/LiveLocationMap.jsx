import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPS_KEY;

const LiveLocationMap = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const watchIdRef = useRef(null);

  const [userLocation, setUserLocation] = useState(null);

  // 📍 Get location immediately on login
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log(pos)
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.error(err);
        alert("Location permission denied");
      },
      { enableHighAccuracy: true }
    );
  }, []);

  // 🗺️ Initialize map after location is ready
  useEffect(() => {
    if (!userLocation || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [userLocation.lng, userLocation.lat],
      zoom: 15,
      interactive: true, // 🔥 IMPORTANT
    });

    // Enable gestures explicitly
    mapRef.current.dragPan.enable();
    mapRef.current.scrollZoom.enable();
    mapRef.current.doubleClickZoom.enable();
    mapRef.current.touchZoomRotate.enable();

    // Marker
    markerRef.current = new mapboxgl.Marker({ color: "red" })
      .setLngLat([userLocation.lng, userLocation.lat])
      .addTo(mapRef.current);

    // 🔄 Live location tracking
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        markerRef.current.setLngLat([longitude, latitude]);

        // Smooth camera follow
        mapRef.current.easeTo({
          center: [longitude, latitude],
          duration: 500,
        });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );

    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [userLocation]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full"
      style={{ touchAction: "pan-x pan-y" }} // 👈 FIX SCROLL ISSUE
    />
  );
};

export default LiveLocationMap;
