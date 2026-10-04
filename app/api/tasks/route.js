import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Task from '@/models/Task'; 

export async function GET() {
  try {
    await dbConnect();

    const tasks = await Task.find({}).sort({ createdAt: -1 });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("GET /api/tasks failed:", error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks from the database.' },
      { status: 500 }
    );
  }
}
