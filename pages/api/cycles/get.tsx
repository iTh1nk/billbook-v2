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
  data?: Array<Cycles>;
  year?: Array<string>;
  message?: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    let resp = await fetch(process.env.NEXT_PUBLIC_API + "cycles/get/");
    let data = await resp.json();
    let yearArr = [];
    data.map((item) =>
      yearArr.push(moment(item.date, "YYYY-MM-DD").format("YYYY"))
    );
    yearArr = Array.from(new Set(yearArr));
    res.status(200).json({ data: data, year: yearArr });
  } catch {
    res
      .status(500)
      .json({ message: "Something went wrong!", data: [], year: [] });
  }
};
