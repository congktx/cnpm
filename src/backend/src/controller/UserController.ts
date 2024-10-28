import { Request, Response } from "express";
import User from "../model/auth/User";

export class UserController {
    constructor() {
        this.getAllUsers = this.getAllUsers.bind(this);
        this.getUserById = this.getUserById.bind(this);
    }

    public async getAllUsers(req: Request, res: Response) {
        try {
            let users = await User.find();
            res.status(200).send({
                
                result: users
            });
        } catch(err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async getUserById(req: Request, res: Response) {
        try {
            let {id} = req.params;
            if (typeof id != "number") {
                res.status(400).send("Invalid input");
                return;
            }
            let user = await User.findOne({id: id});
            if (!user) {
                res.status(404).send("User not found");
                return;
            }
            res.status(200).send({
                
                result: user
            });
        } catch(err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }
}