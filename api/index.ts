import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import verifyToken from "./middleWare";
import jwt from "jsonwebtoken";
import Cors from "cors";
import { Server } from "socket.io";
import http from "http";

dotenv.config();
const port = process.env.PORT;
const secret = process.env.JWT_KEY;

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = { origin: "http://localhost:3000", Credential: true };
app.use(Cors(cors));

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", credentials: true },
});

const prisma = new PrismaClient();

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

io.on("connection", (socket) => {
  console.log(socket.id);
  console.log("a user connected");
  socket.on("first", (asd) => {
    console.log(asd);
    socket.emit("second", "hi");
  });
});

router.post("/post", async (req, res, next) => {
  try {
    const { name, surname, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const exist = await prisma.user.findUnique({ where: { email } });
    if (exist) {
      return res.send("User already exist.");
    } else {
      await prisma.user.create({
        data: {
          name,
          surname,
          email,
          password: hash,
        },
      });
      res.status(201).send("Create Successfully");
    }
  } catch (error) {
    res.status(500).send("Creating Failed");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.send("User not found");
  }
  const token = jwt.sign(
    {
      email: email,
      userId: user.id,
      exp: Math.floor(Date.now() / 1000) + 500,
    },
    secret!
  );
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    res.send("Wrong password");
    return;
  }
  res.status(200).send({ token });
});
router.post("/create/kat", verifyToken, async (req, res) => {
  const { katAd } = req.body;
  await prisma.kategori.create({
    data: {
      katAd,
    },
  });
  res.send("create successfuly");
});
router.post("/create/urun", verifyToken, async (req, res) => {
  const { urunAd, urunfiyat, kat_Id } = req.body;
  console.log(req.body);
  const user = res.locals.payload;
  await prisma.urun.create({
    data: {
      urunAd,
      urunfiyat: parseInt(urunfiyat),
      kat_Id: parseInt(kat_Id),
      userId: user.userId,
    },
  });
  res.send("create successfuly");
});
router.put("/put/:urunId", verifyToken, async (req, res) => {
  if (req.params.urunId != undefined) {
    const { urunAd, urunfiyat, kat_Id } = req.body;
    await prisma.urun.update({
      where: {
        urunId: parseInt(req.params.urunId),
      },
      data: {
        urunAd,
        urunfiyat: parseInt(urunfiyat),
        kat_Id: parseInt(kat_Id),
      },
    });
    res.sendStatus(200);
  } else res.sendStatus(400);
});
router.delete("/:urunId", async (req, res) => {
  if (req.params.urunId != undefined) {
    console.log(req.params.urunId);

    await prisma.urun.delete({
      where: {
        urunId: parseInt(req.params.urunId),
      },
    });
    res.sendStatus(200);
  } else res.sendStatus(400);
});

router.get("/show/kat", async (req, res) => {
  const list = await prisma.kategori.findMany({});
  res.send(list);
});
router.get("/show/urun", verifyToken, async (req, res) => {
  const user = res.locals.payload;
  const list = await prisma.urun.findMany({
    where: { userId: user.userId },
    include: { urunKat: true, urunUser: true },
  });
  res.send(list);
});
app.use("/", router);
