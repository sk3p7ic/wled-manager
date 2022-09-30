import { Device } from "@prisma/client";
import { FormEvent, useState } from "react";
import prisma from "../../lib/prisma";

type EditDevicePageProps = {
  currentDeviceInfo?: Device;
};

const EditDevicePage = ({ currentDeviceInfo }: EditDevicePageProps) => {
  const [nameInputValue, setNameInputValue] = useState(
    currentDeviceInfo?.name ?? ""
  );
  const [ipInputValue, setIpInputValue] = useState(currentDeviceInfo?.ip ?? "");

  if (!currentDeviceInfo) {
    return <div>Device does not exist.</div>;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/devices/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: currentDeviceInfo.id,
        ip: ipInputValue,
        name: nameInputValue,
        locationX: currentDeviceInfo.locationX,
        locationY: currentDeviceInfo.locationY,
      }),
    });
    document.location.replace("/"); // Go back home
  };

  const handleDelete = async () => {
    await fetch("/api/devices/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: currentDeviceInfo.id,
      }),
    });
    document.location.replace("/"); // Go back home
  };

  return (
    <div className="pt-12 flex-grow flex flex-col items-center gap-4">
      <h1 className="text-5xl border-b border-b-neutral-100">
        Edit Device Info
      </h1>
      <form
        className="grid grid-cols-2 gap-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="device-name-input" className="text-xl">
          Name:
        </label>
        <input
          id="device-name-input"
          className="px-2 text-lg text-neutral-800"
          placeholder="Device name"
          value={nameInputValue}
          onChange={(e) => setNameInputValue(e.target.value)}
        />
        <label htmlFor="device-ip-input" className="text-xl">
          IP Address:
        </label>
        <input
          id="device-ip-input"
          className="px-2 text-lg text-neutral-800"
          placeholder="#.#.#.#"
          value={ipInputValue}
          onChange={(e) => setIpInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="col-span-2 py-2 text-xl bg-neutral-900 hover:bg-emerald-600 transition-all"
        >
          Edit
        </button>
      </form>
      <button
        className="mt-8 mx-auto px-4 w-fit py-2 text-xl bg-rose-400 hover:bg-rose-600 transition-all"
        onClick={() => handleDelete()}
      >
        Delete
      </button>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const currentDeviceInfo = await prisma.device.findUnique({
    where: { id: Number.parseInt(context.query.id) },
  });
  return {
    props: { currentDeviceInfo },
  };
};

export default EditDevicePage;
