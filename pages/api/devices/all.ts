import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const getAllDevices = async () => {
  const dbDevices = await prisma.device.findMany();
  return dbDevices;
};

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const devices = await getAllDevices();
  res.json(devices);
};

export default handle;
