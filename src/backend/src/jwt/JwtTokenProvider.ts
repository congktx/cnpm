import * as jwt from 'jsonwebtoken';
import { EMAIL_KEY, USERNAME_KEY } from '../config/constants';
import { ACCESS_TOKEN_TIME, JWT_SECRET_KEY } from '../config/secrets';
import AuthToken from '../model/auth/AuthToken';

export class JwtTokenProvider {
    constructor() {}
    
    public async generateToken(user: any) {
        const now = new Date(Date.now()); 
        const expiryDate = new Date(now.getTime() + ACCESS_TOKEN_TIME * 1000);  

        const token = await jwt.sign(
            {
                sub: user.id.toString(),
                [USERNAME_KEY]: user.username,
                [EMAIL_KEY]: user.name,
                iat: Math.floor(now.getTime() / 1000),  
                exp: Math.floor(expiryDate.getTime() / 1000), 
            },
            JWT_SECRET_KEY,
            { algorithm: 'HS512' }
        );

        return token;
    }

    public async getUserIdFromJWT(token: string) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET_KEY) as jwt.JwtPayload;
            if (decoded && decoded.sub) {
                return parseInt(decoded.sub); 
            }
            return null;
        } catch (err) {
            console.error(`can't get user id from token: ${token}`);
            return null;
        }
    }

    public async validateToken(authToken: string) {
        try {
            let find_token = await AuthToken.findOne({accessToken: authToken});
            if (!find_token) {
                console.error(`Token ${authToken} not found in database`);
                return false;
            }
            jwt.verify(authToken, JWT_SECRET_KEY);
            return true;
        } catch (err) {
            console.error("JwtTokenProvider.validateToken() error: ",err);
            return false;
        }
    }
}
