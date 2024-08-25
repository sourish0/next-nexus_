import { NextResponse } from 'next/server';
import { performDatabaseAction } from '@/lib/timeOver';

export async function GET() {
  try {
    await performDatabaseAction();
    return NextResponse.json({ message: 'Database action completed successfully' });
  } catch (error) {
    console.error('Error performing database action:', error);
    return NextResponse.json({ message: 'Error performing database action', error }, { status: 500 });
  }
}
