import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { ip } = req.query;
  let status;
  try {
    const res = await axios.get(`http://${ip}/json/info`, { timeout: 1000 });
    status = res.status === 200;
  } catch {
    status = false;
  }
  res.json({ up: status });
};
