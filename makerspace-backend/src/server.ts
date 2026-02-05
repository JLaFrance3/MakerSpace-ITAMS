import express, { type Request, type Response } from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import { getItem } from "./router/itemRouter";
import fs from "fs";
import {authenticateUser, getUser} from "./router/userRouter";
import { getEmail } from "./router/emailRouter";
import { getCategory } from "./router/categoryRouter";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Check if config file exists. If not end the process.
const configPath = "./src/config.json";
if (!fs.existsSync(configPath)) {
  console.error("Please added the config.json file to backend src directory.");
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const supabase = createClient(
  config.VITE_SUPABASE_URL,
  config.VITE_SUPABASE_PUBLISHABLE_KEY
);

const main = async () => {
  await initializeServer();
};

const initializeServer = async () => {
  app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:5173"],
    })
  );
  app.use(bodyParser.json());

  app.get("/", (_req: Request, res: Response) => {
    supabase
      .from("instruments")
      .select("*")
      .then((result) => {
        res.send(result.data);
      });
    // res.send('Hello from TS Express!');
  });

  // =============================================================================================================================
  // item routes

  app.get("/items", (_req: Request, res: Response) => {
    try {
      getItem().then((result) => {
        return res.status(200).send(result.data);
      });
    } catch (err) {
      return res.status(500).json({ error: "Unexpected backend error" });
    }
  });

  app.get("/items/:id", (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      getItem(id).then((result) => {
        return res.status(200).send(result.data);
      });
    } catch (err) {
      return res.status(500).json({ error: "Unexpected backend error" });
    }
  });

  app.post("/items", (req: Request) => {
    console.log(req);
  })

  // =============================================================================================================================
  // user routes

  app.get("/users", (_req: Request, res: Response) => {
    try {
      getUser().then((result) => {
        return res.status(200).send(result.data);
      });
    } catch (err) {
      return res.status(500).json({ error: "Unexpected backend error" });
    }
  });

  app.post("/authenticate", (req: Request, res: Response) => {
    try {
      authenticateUser(req.body.username, req.body.password).then((result) => {
        return res.status(200).send(result);
      });
    } catch (err) {
      return res.status(500).json({ error: "Unexpected backend error" });
    }
  });

  app.get("/users/:id", (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      getUser(id).then((result) => {
        return res.status(200).send(result.data);
      });
    } catch (err) {
      return res.status(500).json({ error: "Unexpected backend error" });
    }
  });

  // =============================================================================================================================
  // notification routes

  app.get("/notifications", (_req: Request, res: Response) => {
    try {
      getEmail().then((result) => {
        return res.status(200).send(result.data);
      });
    } catch (err) {
      return res.status(500).json({ error: "Unexpected backend error" });
    }
  });

  // =============================================================================================================================
  // category routes

  app.get("/category", (_req: Request, res: Response) => {
    try {
      getCategory().then((result) => {
        return res.status(200).send(result.data);
      });
    } catch (err) {
      return res.status(500).json({error: "Unexpected backend error"})
    }
  })

  app.get("/category/:id", (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      getCategory(id).then((result) => {
        return res.status(200).send(result.data);
      });
    } catch (err) {
      return res.status(500).json({ error: "Unexpected backend error" });
    }
  });

  // app.get("/notifications/:email", (req: Request, res: Response) => {
  //   try {
  //     const email = new URLSearchParams(req.params).get()
  //     const user = getEmail(email).then((result) => {
  //       return res.status(200).send(result.data);
  //     });
  //   } catch (err) {
  //     return res.status(500).json({ error: "Unexpected backend error" });
  //   }
  // });

  

  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
};

main();
