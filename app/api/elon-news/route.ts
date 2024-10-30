import { NextResponse } from 'next/server';

// Cache duration in milliseconds (e.g., 1 hour)
const CACHE_DURATION = 60 * 60 * 1000;

interface CachedData {
  data: any;
  timestamp: number;
}

let cache: CachedData | null = null;

export async function GET() {
  try {
    const now = Date.now();

    // Return cached data if it's still fresh
    if (cache && (now - cache.timestamp) < CACHE_DURATION) {
      return NextResponse.json(cache.data);
    }

    // Fetch fresh data
    const response = await fetch('https://elonmu.sh/api', {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Update cache
    cache = {
      data,
      timestamp: now
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Elon news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Elon news' },
      { status: 500 }
    );
  }
} 