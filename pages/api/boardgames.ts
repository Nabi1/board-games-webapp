import type { NextApiRequest, NextApiResponse } from "next";
import mock from "../../app/mock/boardGames.json";
import { BroadGameType } from "app/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<BroadGameType[]>
) {
  res.status(200).json(mock);
}
