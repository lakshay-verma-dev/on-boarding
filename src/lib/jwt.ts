import {
    jwtVerify,
    SignJWT,
} from "jose";

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET
);

export const generateToken =
    async (payload: any) => {
        return await new SignJWT(
            payload
        )
            .setProtectedHeader({
                alg: "HS256",
            })
            .setIssuedAt()
            .setExpirationTime("7d")
            .sign(secret);
    };

export const verifyToken =
    async (token: string) => {
        try {
            const {
                payload,
            } = await jwtVerify(
                token,
                secret
            );

            return payload;
        } catch (error) {
            return null;
        }
    };