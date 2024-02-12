import { Request, Response } from "express";
import AppDataSource from "../ormconfig";

export async function healthcheck(req: Request, res: Response) {
  const result = await AppDataSource.query("SELECT 1")
  if(result[0]['1'] === '1') {
    return res.status(200).json({api: 'running', database: 'running'})
  }
  return res.status(500).json({api: 'running', database: 'down'})
}