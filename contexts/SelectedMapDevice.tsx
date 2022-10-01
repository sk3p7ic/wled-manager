import { Device } from "@prisma/client";
import React, { ReactNode, useContext, useState } from "react";

type SelectedMapDeviceType = {
  device: Device | null;
  setDevice: (device: Device) => void;
};

const SelectedMapDevice = React.createContext<SelectedMapDeviceType>({
  device: null,
  setDevice: (device: Device) => {},
});

export const useSelectedMapDevice = () => useContext(SelectedMapDevice);

type SelectedMapDeviceProviderProps = {
  children: ReactNode;
};

export const SelectedMapDeviceProvider = ({
  children,
}: SelectedMapDeviceProviderProps) => {
  const [device, setDevice] = useState<Device | null>(null);

  const setDeviceMethod = (device: Device) => setDevice(device);

  return (
    <SelectedMapDevice.Provider value={{ device, setDevice: setDeviceMethod }}>
      {children}
    </SelectedMapDevice.Provider>
  );
};
