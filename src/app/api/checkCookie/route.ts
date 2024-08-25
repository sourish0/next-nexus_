import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {

    let response = req.cookies.get('token');
    if(response){
        return NextResponse.json({message: 'Cookie Found', result: true});
    }
    return NextResponse.json({message: 'Cookie Not Found', result: false});

}