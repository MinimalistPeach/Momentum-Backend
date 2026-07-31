import { Request } from "express";
import { IncomingHttpHeaders } from "http";

export class TokenHelper {
    public static extractTokenFromHeader(header: IncomingHttpHeaders): string | undefined {
        const [type, token] = header.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}