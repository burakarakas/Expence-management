"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
module.exports;
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server asd");
});
app.post("/post", async (req, res) => {
    try {
        const { name, surname, email, password } = req.body;
        const exist = await prisma.user.findUnique({ where: { email } });
        if (exist) {
            return res.send("User already exist.");
        }
        else {
            await prisma.user.create({
                data: {
                    name,
                    surname,
                    email,
                    password,
                },
            });
            res.status(201).send("Create Successfully");
        }
    }
    catch (error) {
        res.status(500).send("Creating Failed");
    }
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map