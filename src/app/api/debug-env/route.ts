
import { NextResponse } from 'next/server';

export async function GET() {
    const apiKey = process.env.GOOGLE_API_KEY;
    return NextResponse.json({
        apiKeyPresent: !!apiKey,
        envKeys: Object.keys(process.env).filter(k => !k.includes('SECRET') && !k.includes('KEY')), // filtered keys for safety
        apiKeyPrefix: apiKey ? apiKey.substring(0, 5) : 'NONE'
    });
}
