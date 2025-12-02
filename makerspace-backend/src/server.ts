import express, {type Request, type Response} from "express";
import cors from "cors";
import {createClient} from "@supabase/supabase-js";
import config from "./config_DEFAULT.json";
import { getItem } from "./router/itemRouter";
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
      origin: ["http://localhost:3000", "http://localhost:5173"]
    })
  );

  app.get('/', (req: Request, res: Response) => {
    supabase.from("instruments").select("*").then(result => {
        res.send(result.data);
    });
    // res.send('Hello from TS Express!');
  });

  app.get('/items', (req: Request, res: Response) => {
    try {
      const items = getItem().then((result) => {
        return res.status(200).send(result.data)
      });


    } catch (err) {
      return res.status(500).json({ error: "Unexpected backend error"});
    }
  })

  app.get('/items/:id', (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      const items = getItem(id).then((result) => {
        return res.status(200).send(result.data)
      });


    } catch (err) {
      return res.status(500).json({ error: "Unexpected backend error"});
    }
  })

  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  })
}

main();