import { NextApiRequest, NextApiResponse } from "next";
import moment from "moment";

type CycleStatements = {
  id: number;
  balance: string;
  notes: string;
  createdAt: Date;
  updateAt: Date;
  user: string;
  cycle: number;
};

type Cycles = {
  id: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  cycle_statements: CycleStatements;
};
type Data = {
  data: Array<Cycles>;
  year: Array<string>;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log(req);
  const {
    query: { cycleId },
  } = req;
  let resp = await fetch(process.env.NEXT_PUBLIC_API + `cycles/get/${cycleId}`);
  let data = await resp.json();
  console.log(data);
  res.status(200).json(data);
};
