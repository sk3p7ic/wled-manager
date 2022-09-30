import { NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const getDeviceById = async (id: number) => {
  const device = await prisma.device.findUnique({ where: { id: id } });
  return device;
};

const handle = async (req: any, res: NextApiResponse) => {
  const { id } = req.query;
  const device = getDeviceById(Number.parseInt(id));
  res.json(device);
};

export default handle;
