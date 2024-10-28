import { Request, Response } from "express";
export class ServerController {
    constructor() {
        this.NotifyOnline = this.NotifyOnline.bind(this);
    }

    public async NotifyOnline(req: Request, res: Response) {
        res.status(200).send("server is online");
    }
}