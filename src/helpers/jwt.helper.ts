import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { JsonWebTokenError, JwtService, TokenExpiredError } from "@nestjs/jwt";

@Injectable()
export class JwtHelper {
    constructor(private jwt:JwtService ) {}

    generateToken(payload: {id:number,role: string}): object {
        const accesToken = this.jwt.sign(payload);
        return { accesToken };
    };

    verifyToken(token: string): {id: number, role: string} {
        try {
            const data = this.jwt.verify(token);
            return data;
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new ForbiddenException("Token expired");
            }

            if (error instanceof JsonWebTokenError) {
                throw new ConflictException("Invalid token");
            }

            throw new InternalServerErrorException("Internal server error");
        }
    }
}