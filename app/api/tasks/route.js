import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Task from '@/models/Task';

export async function GET() {
  try {
    await dbConnect();
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tasks from the database.' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();

    const { title } = body;

    const newTask = await Task.create({ title });

    return NextResponse.json(newTask, { status: 201 });

  } catch (error) {
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Bad Request: Title is required and cannot be empty.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error: Failed to create the task.' },
      { status: 500 }
    );
  }
}
