import { defaultDpi, DPI, Media } from "@model/Media";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
export class MediaDpiMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const hasDpi = Object.values(DPI).includes(req.headers["x-dpi"] as DPI);
    Media.dpi = (hasDpi ? req.headers["x-dpi"] : defaultDpi) as DPI;
    req.headers["x-dpi"] = Media.dpi;
    // ! Must be separated for sake of single responsibility
    next();
  }
}
