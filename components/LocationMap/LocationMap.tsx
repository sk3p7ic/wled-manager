import { Device } from "@prisma/client";
import { useMapMode } from "../../contexts/MapModeContext";
import { MapDisplay } from "./MapDisplay";

type LocationMapProps = {
  devices: Device[];
};

export const LocationMap = ({ devices }: LocationMapProps) => {
  const { editMode, toggle: toggleMode, didPosChange, reset } = useMapMode();

  return (
    <div className="flex-grow flex flex-col">
      <div className="px-4 pt-3 flex flex-row items-end gap-4 border-b border-b-neutral-100">
        <h1 className="mt-5 text-2xl font-bold">Device Locations</h1>
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
          <button className="mb-1 mt-2 px-4 py-2 bg-neutral-900 hover:bg-emerald-600 transition-all">
            Save Changes
          </button>
        )}
      </div>
      <MapDisplay nodes={devices} />
    </div>
  );
};
