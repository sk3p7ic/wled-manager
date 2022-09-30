import { NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handle = async (req: any, res: NextApiResponse) => {
  const { id } = req.body;
  await prisma.device.delete({ where: { id: id } });
  res.redirect("/");
};

export default handle;
