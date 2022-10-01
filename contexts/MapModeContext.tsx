import React, { ReactNode, useContext, useState } from "react";

const MapModeContext = React.createContext({
  editMode: false,
  toggle: () => {},
  didPosChange: false,
  setPosChange: () => {},
  reset: () => {},
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

  return (
    <MapModeContext.Provider
      value={{
        editMode,
        toggle,
        didPosChange,
        setPosChange: setPosChangeMethod,
        reset,
      }}
    >
      {children}
    </MapModeContext.Provider>
  );
};
