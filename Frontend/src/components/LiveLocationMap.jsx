import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPS_KEY;

const containerStyle = {
  width: "100%",
  height: "100%",
};

const LiveLocationMap = () => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 28.6139,
    lng: 77.209,
  });

  useEffect(() => {
    let map;

    // Initialize Mapbox map
    map = new mapboxgl.Map({
      container: "mapbox-container",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [currentPosition.lng, currentPosition.lat],
      zoom: 15,
    });

    // User marker
    let marker = new mapboxgl.Marker({ color: "red" })
      .setLngLat([currentPosition.lng, currentPosition.lat])
      .addTo(map);

    // Track live location
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });

        // Update map center
        map.setCenter([longitude, latitude]);

        // Update marker
        marker.setLngLat([longitude, latitude]);
      },
      (err) => console.log(err),
      { enableHighAccuracy: true }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      map.remove();
    };
  }, []);

  return (
    <div
      id="mapbox-container"
      style={{
        width: "100%",
        height: "100%",
      }}
    ></div>
  );
};

export default LiveLocationMap;
