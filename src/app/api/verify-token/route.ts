import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  
  // console.log('userSession', userSession);
  if (!token) {
    return NextResponse.json({ message: 'No token found' }, { status: 401 });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const response = NextResponse.json({ message: 'Token valid', data: decoded });
    response.cookies.set('next-auth.session-token', "", { maxAge: 0 });
    return response

  } catch (err) {
    return NextResponse.json({ message: 'Invalid token', error: err }, { status: 401 });
  }
}
