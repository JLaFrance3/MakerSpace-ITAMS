import express, {type Request, type Response} from "express";
import cors from "cors";
import {createClient} from "@supabase/supabase-js";
import config from "./config.json";
// import fs from 'fs';

const app = express();
const port = 3000;

const supabase = createClient(config.VITE_SUPABASE_URL, config.VITE_SUPABASE_PUBLISHABLE_KEY);


const main = async () => {
  await initializeServer();
}

const initializeServer = async () => {

  app.use(
    cors({
      origin: ["*"]
    })
  );

  app.get('/', (req: Request, res: Response) => {
    supabase.from("instruments").select("*").then(result => {
        res.send(result.data);
    });
    // res.send('Hello from TS Express!');
  });

  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  })
}

main();