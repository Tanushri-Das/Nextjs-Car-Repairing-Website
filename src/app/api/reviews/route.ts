import clientPromise from "@/lib/MongodbClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the database
    const client = await clientPromise;
    const db = client.db();

    const reviewsCollection = await db.collection("reviews").find({}).toArray();

    return NextResponse.json(reviewsCollection, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Handle any errors that occur during the database fetch
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // Return a generic error message if something unexpected occurs
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

export const POST = async (request: Request) => {
  try {
    const newReview = await request.json();

    // MongoDB তে সংযোগ স্থাপন
    const client = await clientPromise;
    const db = client.db();
    const reviewsCollection = db.collection("reviews");

    // নতুন contact ডেটা MongoDB তে insert করা
    await reviewsCollection.insertOne(newReview);

    return NextResponse.json(
      { message: "Review added successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};
