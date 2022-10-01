import { useEffect, useState } from "react";

type StatusIndicatorProps = {
  ip: string;
};

export const StatusIndicator = ({ ip }: StatusIndicatorProps) => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      const res = await fetch(`/api/devices/status/${ip}`);
      const s = await res.json();
      setStatus(s.up);
    };

    checkStatus();
  }, [ip]);

  return (
    <div
      className={`w-4 h-4 ${
        status ? "bg-emerald-600" : "bg-rose-600"
      } rounded-full`}
    />
  );
};
