import { Device } from "@prisma/client";
import type { GetServerSidePropsContext } from "next";
import { LocationMap } from "../components/LocationMap/LocationMap";
import { MapDeviceList } from "../components/LocationMap/MapDeviceList";
import { MapModeContextProvider } from "../contexts/MapModeContext";
import { SelectedMapDeviceProvider } from "../contexts/SelectedMapDevice";
import prisma from "../lib/prisma";

type LocationPageProps = {
  devices: Device[];
};

const LocationPage = ({ devices }: LocationPageProps) => {
  return (
    <div className="flex-grow flex flex-row">
      <SelectedMapDeviceProvider>
        <MapDeviceList devices={devices} />
        <MapModeContextProvider>
          <LocationMap devices={devices} />
        </MapModeContextProvider>
      </SelectedMapDeviceProvider>
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const dbDevices = await prisma.device.findMany();
  return {
    props: {
      devices: dbDevices,
    },
  };
};

export default LocationPage;
