import React, { useEffect } from "react";
import { useMap } from "react-leaflet";

const AdjustViewMap = ({ bounds }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds && bounds.length === 2) {
      map.fitBounds(bounds, { padding: [50, 50] }); // Zoom to fit both locations
    }
  }, [bounds, map]);

  return null;
};

export default AdjustViewMap;
