import React, { ReactNode, useContext, useState } from "react";

const MapModeContext = React.createContext({
  editMode: false,
  toggle: () => {},
});

export const useMapMode = () => useContext(MapModeContext);

type MapModeContextProviderProps = {
  children: ReactNode;
};

export const MapModeContextProvider = ({
  children,
}: MapModeContextProviderProps) => {
  const [editMode, setEditMode] = useState(false);

  const toggle = () => {
    const curr = editMode;
    setEditMode(!curr);
  };

  return (
    <MapModeContext.Provider value={{ editMode, toggle }}>
      {children}
    </MapModeContext.Provider>
  );
};
