import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse) {
  const getCookies = cookies()
  const nextAuthSession = getCookies.get('next-auth.session-token')?.value || ''

  return NextResponse.json(nextAuthSession)
}
