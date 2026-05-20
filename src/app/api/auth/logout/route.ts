import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response =
            NextResponse.json({
                success: true,
                message:
                    "Logout successful",
            });

        // Remove Cookie
        response.cookies.set(
            "token",
            "",
            {
                httpOnly: true,

                expires: new Date(0),

                path: "/",
            }
        );

        return response;
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Something went wrong",
            },
            {
                status: 500,
            }
        );
    }
}