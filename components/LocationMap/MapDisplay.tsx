import { Device } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useMapMode } from "../../contexts/MapModeContext";
import { MapDisplayNode } from "./MapDisplayNode";
import MapImage from "../../public/map.jpg";

type MapDisplayProps = {
  nodes: Device[];
};

export const MapDisplay = ({ nodes }: MapDisplayProps) => {
  const { editMode, setPosChange } = useMapMode();
  const mapRef = React.createRef<HTMLDivElement>();
  const [dimen, setDimen] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (mapRef.current)
      setDimen({
        w: mapRef.current.clientWidth,
        h: mapRef.current.clientHeight,
      });
  }, [mapRef.current]);

  return (
    <div
      className="flex-grow relative"
      ref={mapRef}
      style={{
        backgroundImage: "url('/map.jpg')",
        backgroundSize: "100% 100%",
      }}
    >
      {nodes.map((node) => (
        <MapDisplayNode
          node={node}
          key={node.id}
          draggable={editMode}
          onPosChange={setPosChange}
          mapSize={dimen}
        />
      ))}
    </div>
  );
};
