import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
const port = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(express.json());
app.use(cors({ origin: "*" }));

const username = "admin";
const password = "admin";

app.post("/api/authcheck", (req, res) => {
  const { name, pass } = req.body;
  try {
    if (name == username && pass == password) {
      console.log("user validated");
      return res.status(200).json({
        msg: "User validated",
      });
    } else {
      return res.status(401).json({
        msg: "unable to  validat",
      });
    }
  } catch (error) {
    console.log("Error while validating the user");
  }
});

app.listen(port, () => {
  console.log(`Sever started at ${port} http://localhost:${port}`);
});
