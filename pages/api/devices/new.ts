import { NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handle = async (req: any, res: NextApiResponse) => {
  const { ip, name } = req.body;
  await prisma.device.create({
    data: { ip: ip, name: name, locationX: 50, locationY: 50 },
  });
  res.redirect("/");
};

export default handle;
