import { useState, useCallback } from "react";

export const useGeolocation = (onLocationUpdate) => {
  const [detecting, setDetecting] = useState(false);

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Géolocalisation non supportée");
      return;
    }

    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        onLocationUpdate?.(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        setDetecting(false);
        alert(`Position détectée !\nLat: ${latitude.toFixed(4)} | Lng: ${longitude.toFixed(4)}`);
      },
      () => {
        setDetecting(false);
        alert("Permission refusée");
      },
      { timeout: 10000 }
    );
  }, [onLocationUpdate]);

  return { detecting, detectLocation };
};