import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Task from '@/models/Task';

export async function PATCH(request, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    const body = await request.json();

    const { completed } = body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { completed },
      { 
        new: true,           
        runValidators: true, 
      }
    );

    if (!updatedTask) {
      return NextResponse.json(
        { error: 'Task not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTask, { status: 200 });

  } catch (error) {
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Bad Request: Invalid data provided for update.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error: Failed to update the task.' },
      { status: 500 }
    );
  }
}
