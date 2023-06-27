import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    Message: "API Status: OK",
    Method: "GET",
  });
}
