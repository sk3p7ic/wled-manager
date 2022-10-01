import { Device } from "@prisma/client";
import type { GetServerSidePropsContext } from "next";
import { MapDeviceList } from "../components/LocationMap/MapDeviceList";
import prisma from "../lib/prisma";

type LocationPageProps = {
  devices: Device[];
};

const LocationPage = ({ devices }: LocationPageProps) => {
  return (
    <div className="flex-grow flex flex-row">
      <MapDeviceList devices={devices} />
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
