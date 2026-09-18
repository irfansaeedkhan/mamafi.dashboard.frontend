import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const bucketId = searchParams.get('bucketId');

    if (!userId || !bucketId) {
      return NextResponse.json(
        { error: 'Missing userId or bucketId parameter' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      userId,
      bucketId,
      data: Array.from({ length: 8 }, (_, index) => ({
        timestamp: Date.now() - (7 - index) * 86400000,
        value: 64 + index * 3.2,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

