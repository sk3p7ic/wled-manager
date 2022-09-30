import type { GetServerSidePropsContext } from "next";
import { Device } from "@prisma/client";
import prisma from "../lib/prisma";
import { useState } from "react";
import Link from "next/link";

type HomePageProps = {
  devices: Device[];
};

const HomePage = ({ devices }: HomePageProps) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="pt-12 flex-grow flex flex-col items-center gap-4">
      <h1 className="text-5xl border-b border-b-neutral-100">
        {editMode ? "Edit Device" : "Device List"}
      </h1>
      <div className="flex flex-col gap-2">
        {devices.map((device, index) => (
          <>
            {editMode ? (
              <EditDevice device={device} key={index} />
            ) : (
              <LinkDevice device={device} key={index} />
            )}
          </>
        ))}
      </div>
      <Link href="/newDevice">
        <a className="py-2 px-4 text-lg bg-neutral-900 hover:bg-emerald-600 hover:rounded-md transition-all">
          Add a New Device
        </a>
      </Link>
      <button
        onClick={() => setEditMode(!editMode)}
        className="py-2 px-4 text-lg bg-neutral-900 hover:bg-emerald-600 hover:rounded-md transition-all"
      >
        {editMode ? "Back to Normal" : "Edit Device Mode"}
      </button>
    </div>
  );
};

type DeviceProps = {
  device: Device;
};

const LinkDevice = ({ device }: DeviceProps) => {
  return (
    <Link href={`http://${device.ip}/`} key={device.id}>
      <a className="flex flex-row gap-4 py-4 px-8 rounded-sm text-xl bg-neutral-700 hover:bg-violet-600 hover:rounded-xl transition-all">
        <p>{device.ip}</p>
        <p>{device.name}</p>
      </a>
    </Link>
  );
};

const EditDevice = ({ device }: DeviceProps) => {
  return (
    <Link href={`/edit/${device.id}/`} key={device.id}>
      <a className="flex flex-row gap-4 py-4 px-8 rounded-sm text-xl bg-neutral-700 hover:bg-violet-600 hover:rounded-xl transition-all">
        <p>{device.ip}</p>
        <p>{device.name}</p>
      </a>
    </Link>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const dbDevices = await prisma.device.findMany();
  return {
    props: { devices: dbDevices },
  };
};

export default HomePage;
