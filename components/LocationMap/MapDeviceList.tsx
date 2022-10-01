import { Device } from "@prisma/client";
import { useSelectedMapDevice } from "../../contexts/SelectedMapDevice";
import { StatusIndicator } from "../StatusIndicator";

type MapDeviceListProps = {
  devices: Device[];
};

export const MapDeviceList = ({ devices }: MapDeviceListProps) => {
  const { device: selectedDevice, setDevice: setSelectedDevice } =
    useSelectedMapDevice();

  const formatName = (name: string) => {
    if (name.length <= 12) return name;
    else return name.substring(0, 10) + "...";
  };

  return (
    <div className="border-r border-r-neutral-100 py-8">
      <h1 className="w-full px-4 text-2xl font-bold border-b border-b-neutral-100">
        Devices
      </h1>
      <div className="px-4 pt-4 flex flex-col gap-2">
        {devices.map((device) => (
          <button
            key={device.ip}
            className={`flex flex-row gap-2 items-center transition-all px-2 py-1 rounded-full ${
              selectedDevice === device ? "bg-violet-600" : ""
            }`}
            onClick={() => setSelectedDevice(device)}
          >
            <StatusIndicator ip={device.ip} />
            <p>{device.id}</p>
            <p>{device.ip}</p>
            <p>{formatName(device.name)}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
