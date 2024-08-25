import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {

  const response = NextResponse.json({ message: 'Logged out successfully!' }, { status: 200 })
  // Clear the 'token' cookie by setting maxAge to 0 or setting an expiry date in the past
  response.cookies.set('token', '', { maxAge: 0, path: '/' });
  return response;

}
