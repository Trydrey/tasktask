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
       if (typeof completed !== "boolean") {
     return NextResponse.json(
       { error: "completed must be true or false." },
       { status: 400 }
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

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Task from '@/models/Task';

export async function DELETE(request, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json(
        { error: 'Task not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Task deleted successfully.', id },
      { status: 200 }
    );
  } catch (error) {
    // Handle invalid MongoDB ObjectId errors
    if (error.name === 'CastError') {
      return NextResponse.json(
        { error: 'Invalid Task ID format.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error: Failed to delete the task.' },
      { status: 500 }
    );
  }
}