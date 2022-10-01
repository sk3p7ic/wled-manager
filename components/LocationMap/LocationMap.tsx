import { Device } from "@prisma/client";
import { useMapMode } from "../../contexts/MapModeContext";
import { MapDisplay } from "./MapDisplay";

type LocationMapProps = {
  devices: Device[];
};

export const LocationMap = ({ devices }: LocationMapProps) => {
  const {
    editMode,
    toggle: toggleMode,
    didPosChange,
    reset,
    devicePositionStates,
  } = useMapMode();

  const saveChanges = async () => {
    const deviceMap = new Map(devices.map((dev) => [dev.id, dev]));
    for await (const [id, coord] of devicePositionStates.entries()) {
      const device = deviceMap.get(id);
      if (!device) continue;
      await fetch(`/api/devices/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...device,
          locationX: coord.x,
          locationY: coord.y,
        }),
      });
    }
    reset();
    document.location.replace("/locations");
  };

  return (
    <div className="flex-grow flex flex-col">
      <div className="px-4 pt-3 flex flex-row items-end gap-4 border-b border-b-neutral-100">
        <h1 className="mt-5 text-2xl font-bold">
          {editMode ? "Edit " : ""}Device Locations
        </h1>
        <div className="flex-grow">
          {!editMode && (
            <button
              className="mb-1 mt-2 px-4 py-2 bg-neutral-900 hover:bg-emerald-600 transition-all"
              onClick={() => toggleMode()}
            >
              Toggle Edit
            </button>
          )}
        </div>
        {didPosChange && (
          <button
            className="mb-1 mt-2 px-4 py-2 bg-neutral-900 hover:bg-emerald-600 transition-all"
            onClick={() => saveChanges()}
          >
            Save Changes
          </button>
        )}
      </div>
      <MapDisplay nodes={devices} />
    </div>
  );
};
