import { Device } from "@prisma/client";
import { useMapMode } from "../../contexts/MapModeContext";
import { MapDisplayNode } from "./MapDisplayNode";

type MapDisplayProps = {
  nodes: Device[];
};

export const MapDisplay = ({ nodes }: MapDisplayProps) => {
  const { editMode, didPosChange, setPosChange } = useMapMode();

  return (
    <div className="flex-grow relative">
      {nodes.map((node) => (
        <MapDisplayNode node={node} key={node.id} draggable={editMode} />
      ))}
    </div>
  );
};
