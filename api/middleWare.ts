import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || "";
    console.log(token);

    const decodedToken = jwt.verify(token, process.env.JWT_KEY!);
    console.log(decodedToken);
    res.locals.payload = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send({
      message: "unauthorized access",
      status: -1,
    });
  }
};
export default verifyToken;
