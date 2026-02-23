import { NextRequest, NextResponse } from "next/server";
import {
    getTrainingConfig,
    updateTrainingConfig,
    initializeDatabase,
    TrainingConfig,
} from "@/lib/db";

function authenticate(request: NextRequest): boolean {
    const password = request.headers.get("x-admin-password");
    return password === process.env.ADMIN_PASSWORD;
}

export async function GET(request: NextRequest) {
    if (!authenticate(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await initializeDatabase();
        const config = await getTrainingConfig();
        return NextResponse.json(config);
    } catch (error) {
        console.error("Admin GET error:", error);
        return NextResponse.json(
            { error: "Failed to fetch config" },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    if (!authenticate(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { field, value } = body as {
            field: keyof Omit<TrainingConfig, "id" | "updated_at">;
            value: string;
        };

        if (!field || typeof value !== "string") {
            return NextResponse.json(
                { error: "Field and value are required" },
                { status: 400 }
            );
        }

        await updateTrainingConfig(field, value);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Admin PUT error:", error);
        return NextResponse.json(
            { error: "Failed to update config" },
            { status: 500 }
        );
    }
}
