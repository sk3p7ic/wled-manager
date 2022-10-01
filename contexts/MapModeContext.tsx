import React, { ReactNode, useContext, useState } from "react";
import { Device } from "@prisma/client";

const MapModeContext = React.createContext({
  editMode: false,
  toggle: () => {},
  didPosChange: false,
  setPosChange: () => {},
  reset: () => {},
  devicePositionStates: new Map<number, { x: number; y: number }>(),
  editDevicePositionState: (id: number, x: number, y: number) => {},
  initialDevices: new Map<number, Device>(),
  setInitialDevices: (devices: Map<number, Device>) => {},
});

export const useMapMode = () => useContext(MapModeContext);

type MapModeContextProviderProps = {
  children: ReactNode;
};

export const MapModeContextProvider = ({
  children,
}: MapModeContextProviderProps) => {
  const [editMode, setEditMode] = useState(false);
  const [didPosChange, setPosChange] = useState(false);
  const [devicePositionStates, setDevicePositionStates] = useState(
    new Map<number, { x: number; y: number }>()
  );
  const [initialDevices, setInitialDevices] = useState(
    new Map<number, Device>()
  );

  const toggle = () => {
    const curr = editMode;
    setEditMode(!curr);
  };

  const setPosChangeMethod = () => {
    const curr = didPosChange;
    setPosChange(!curr);
  };

  const reset = () => {
    setEditMode(false);
    setPosChange(false);
  };

  const editDevicePositionState = (id: number, x: number, y: number) => {
    const oldMap = devicePositionStates; // Get a copy
    oldMap.set(id, { x, y });
    setDevicePositionStates(new Map(oldMap));
  };

  const setInitialDevicesMethod = (devices: Map<number, Device>) =>
    setInitialDevices(devices);

  return (
    <MapModeContext.Provider
      value={{
        editMode,
        toggle,
        didPosChange,
        setPosChange: setPosChangeMethod,
        reset,
        devicePositionStates,
        editDevicePositionState,
        initialDevices,
        setInitialDevices: setInitialDevicesMethod,
      }}
    >
      {children}
    </MapModeContext.Provider>
  );
};
