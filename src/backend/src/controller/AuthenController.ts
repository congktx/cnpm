import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../model/auth/User";
import { encodePassword, getNextId } from "../utils/utils";
import AuthToken, { IAuthToken } from "../model/auth/AuthToken";
import { JwtTokenProvider } from "../jwt/JwtTokenProvider";
import { JWT_EXPIRATION } from "../config/constants";

export class AuthenController {
    public jwtTokenProvider = new JwtTokenProvider();

    constructor() {
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.authorizeToken = this.authorizeToken.bind(this);
    }

    public async register(req: Request, res: Response) {
        try {
            console.log(req.body);
            let { username, password, name } = req.body;
            if (typeof username !== 'string' || typeof password !== 'string' || typeof name !== 'string') {
                res.status(400).send('Invalid input');
                return;
            }
            let password_encoded = await encodePassword(password);
            let new_user: IUser = {
                id: await getNextId(User),
                username: username,
                password: password_encoded,
                name: name,
                isDeleted: false,
                isActive: true
            };
            await User.create(new_user);
            res.status(200).send({
                
                result: new_user
            });
        } catch(err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async login(req: Request, res: Response) {
        try {
            let { username, password } = req.body;
            if (typeof username !== 'string' || typeof password !== 'string') {
                res.status(400).send('Invalid input');
                return;
            }
            let password_encoded = await encodePassword(password);
            let user = await User.findOne({username: username, password: password_encoded});
            if (!user) {
                res.status(404).send('User not found');
                return;
            }
            let accessToken = "";
            let authToken = await AuthToken.findOne({userId: user.id});
            if (authToken) {
                if (Number(authToken.expireIn) < Number(Date.now())) {
                    accessToken = await this.jwtTokenProvider.generateToken(user);
                    authToken.accessToken = accessToken;
                    authToken.updatedAt = Number(Date.now());
                    authToken.expireIn = Number(Date.now()) + JWT_EXPIRATION;
                    await authToken.save();
                } else {
                    accessToken = authToken.accessToken;
                }
            } else {
                accessToken = await this.jwtTokenProvider.generateToken(user);
                let now_number = Number(Date.now());
                let new_auth_token: IAuthToken = {
                    id: await getNextId(AuthToken),
                    accessToken: accessToken,
                    createdAt: new Date(now_number).toISOString(),
                    updatedAt: new Date(now_number).toISOString(),
                    expireIn: new Date(now_number + JWT_EXPIRATION).toISOString(),
                    userId: user.id
                };
                await AuthToken.create(new_auth_token);
            }
            res.status(200).send({
                result: {
                    username: username,
                    accessToken: accessToken
                }
            });
        } catch(err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async changePassword(req: Request, res: Response) {
        try {
            let {id} = req.params;
            let {oldPassword, newPassword} = req.body;
            let encodedOldPassword = await encodePassword(oldPassword);
            let user = await User.findOne({id: id, password: encodedOldPassword});
            if (!user) {
                res.status(404).send('User not found');
                return;
            }
            let encodedNewPassword = await encodePassword(newPassword);
            user.password = encodedNewPassword;
            await user.save();
            res.status(200).send({
                
                result: user
            });
        } catch(err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }

    public async authorizeToken(req: Request, res: Response, next: NextFunction) {
        try {
            let {Authorization} = req.headers;
            if (typeof Authorization !== 'string') {
                res.status(401).send('Unauthorized');
                return;
            }
            let accessToken = Authorization.replace('Bearer ', '');
            if (!this.jwtTokenProvider.validateToken(accessToken)) {
                res.status(401).send('Unauthorized');
                return;
            }
            next();
        } catch(err: any) {
            console.log(err);
            res.status(500).send(err.toString());
        }
    }
}