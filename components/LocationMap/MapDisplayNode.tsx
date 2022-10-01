import { Device } from "@prisma/client";
import { useState, useEffect } from "react";
import { useSelectedMapDevice } from "../../contexts/SelectedMapDevice";

type MapDisplayNodeProps = {
  node: Device;
  draggable: boolean;
};
export const MapDisplayNode = ({ node, draggable }: MapDisplayNodeProps) => {
  const [coords, setCoords] = useState<{ x: number; y: number }>({
    x: node.locationX,
    y: node.locationY,
  });
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      const res = await fetch(`/api/devices/status/${node.ip}`);
      const s = await res.json();
      setStatus(s.up);
    };

    checkStatus();
  }, [node.ip]);

  const { device, setDevice } = useSelectedMapDevice();

  return (
    <div
      className={`absolute h-12 w-12 rounded-lg text-sm flex items-center justify-center cursor-pointer ${
        node.id === device?.id ?? -1 ? "border-2 border-neutral-100" : ""
      } ${status ? "bg-emerald-600" : "bg-rose-600"}`}
      style={{ top: `${coords.y}%`, left: `${coords.x}%` }}
      onClick={() => setDevice(node)}
    >
      {node.id}
    </div>
  );
};
