import {JwtTokenProvider} from './src/jwt/JwtTokenProvider';
import {randomUUID} from 'crypto';

async function testJwtTokenProvider() {
    const jwtTokenProvider = new JwtTokenProvider();
    let token = await jwtTokenProvider.generateToken(
        {
            id: 100,
            username: 'admin',
            name: '@'
        }
    );
    let userId = await jwtTokenProvider.getUserIdFromJWT(token);
    let decoded = await jwtTokenProvider.validateToken(token);
    console.log(token);
    console.log(userId);
    console.log(decoded);
}

// testJwtTokenProvider();

async function testCrypto() {
    console.log(randomUUID());   
}

// testCrypto();