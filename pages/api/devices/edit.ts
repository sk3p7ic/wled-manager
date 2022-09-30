import { NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handle = async (req: any, res: NextApiResponse) => {
  const { id, ip, name, locationX, locationY } = req.body;
  await prisma.device.update({
    where: { id: id },
    data: {
      ip: ip,
      name: name,
      locationX: locationX,
      locationY: locationY,
    },
  });
  res.redirect("/");
};

export default handle;
