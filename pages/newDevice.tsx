import type { NextPage } from "next";
import { FormEvent, useState } from "react";

const NewDevicePage: NextPage = () => {
  const [nameInputValue, setNameInputValue] = useState("");
  const [ipInputValue, setIpInputValue] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/devices/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ip: ipInputValue, name: nameInputValue }),
    });
    document.location.replace("/"); // Go back home
  };

  return (
    <div className="pt-12 flex-grow flex flex-col items-center gap-4">
      <h1 className="text-5xl border-b border-b-neutral-100">
        Add a New Device
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
          Add Device
        </button>
      </form>
    </div>
  );
};

export const getStaticProps = () => {
  return { props: {} };
};

export default NewDevicePage;
