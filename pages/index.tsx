import type { GetServerSidePropsContext, NextPage } from "next";
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
      <div>
        {devices.map((device) => (
          <>
            {editMode ? (
              <EditDevice device={device} key={device.id} />
            ) : (
              <LinkDevice device={device} key={device.id} />
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
  key: number;
};

const LinkDevice = ({ device, key }: DeviceProps) => {
  return (
    <Link href={`http://${device.ip}/`} key={key}>
      <a className="flex flex-row gap-4 py-4 px-8 rounded-sm text-xl bg-neutral-700 hover:bg-violet-600 hover:rounded-xl transition-all">
        <p>{device.ip}</p>
        <p>{device.name}</p>
      </a>
    </Link>
  );
};

const EditDevice = ({ device, key }: DeviceProps) => {
  return (
    <Link href={`/edit/${device.ip}/`} key={key}>
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
