import clientPromise from "@/lib/MongodbClient";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const client = await clientPromise;
  const db = client.db();
  const servicesCollection = db.collection("services");

  try {
    const service = await servicesCollection.findOne({
      _id: new ObjectId(params.id),
    });
    if (!service) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Service found successfully",
      response: service,
    });
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
