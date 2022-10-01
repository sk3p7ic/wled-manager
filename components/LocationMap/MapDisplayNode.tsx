import { Device } from "@prisma/client";
import React, { useState, useEffect } from "react";
import { useSelectedMapDevice } from "../../contexts/SelectedMapDevice";

type MapDisplayNodeProps = {
  node: Device;
  draggable: boolean;
  onPosChange: () => void;
  mapSize: { w: number; h: number };
};
export const MapDisplayNode = ({
  node,
  draggable,
  onPosChange,
  mapSize,
}: MapDisplayNodeProps) => {
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

  const validateMaxDimen = (
    top: number,
    left: number,
    width: number,
    height: number
  ): Boolean => {
    const dimen = mapSize;
    return top + height <= dimen.h && left + width <= dimen.w;
  };

  const enableDragging = (element: HTMLElement) => {
    let prevX = 0;
    let prevY = 0;
    element.onmousedown = (me: MouseEvent) => {
      me.preventDefault();
      prevX = me.clientX;
      prevY = me.clientY;
      document.onmouseup = () => {
        document.onmouseup = null;
        document.onmousemove = null;
      };
      document.onmousemove = (e: MouseEvent) => {
        e.preventDefault();
        const newTop = element.offsetTop - (prevY - e.clientY);
        const newLeft = element.offsetLeft - (prevX - e.clientX);
        if (
          newTop >= 0 &&
          newLeft >= element.clientWidth / 2 &&
          validateMaxDimen(
            newTop,
            newLeft,
            (element.clientWidth / 4) * 3,
            element.clientHeight
          )
        ) {
          element.style.top = newTop + "px";
          element.style.left = newLeft + "px";
        }
        prevX = e.clientX;
        prevY = e.clientY;
        const coords = toPercentCoords(element);
        if (coords.x !== node.locationX && coords.y !== node.locationY)
          onPosChange();
      };
    };
  };

  type CoordsType = {
    x: number;
    y: number;
  };

  const toPercentCoords = (e: HTMLElement): CoordsType => {
    const x = (Number.parseFloat(e.style.left) / mapSize.w) * 100;
    const y = (Number.parseFloat(e.style.top) / mapSize.h) * 100;
    return { x, y };
  };

  const nodeRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    if (!nodeRef.current) return;
    enableDragging(nodeRef.current);
    // eslint-disable-next-line
  }, [draggable]);

  return (
    <div
      className={`absolute h-12 w-12 rounded-lg text-sm flex items-center justify-center cursor-pointer ${
        node.id === device?.id ?? -1 ? "border-2 border-neutral-100" : ""
      } ${status ? "bg-emerald-600" : "bg-rose-600"}`}
      style={{ top: `${coords.y}%`, left: `${coords.x}%` }}
      onClick={() => setDevice(node)}
      ref={nodeRef}
    >
      {node.id}
    </div>
  );
};
