// app/api/transfer/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Forward the request to your FastAPI backend
    const response = await axios.post(`${API_BASE_URL}/transfer`, body, {
      timeout: 60000, // 60 seconds for transfer operations
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Transfer API Error:", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.detail || "Transfer failed" },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// app/api/transfer/start/route.ts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await axios.post(`${API_BASE_URL}/transfer/start`, body);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Start Transfer API Error:", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.detail || "Failed to start transfer" },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// app/api/transfer/progress/[transferId]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { transferId: string } },
) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/transfer/progress/${params.transferId}`,
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Progress API Error:", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.detail || "Failed to get progress" },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// app/api/youtube/validate/route.ts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await axios.post(
      `${API_BASE_URL}/youtube/validate-url`,
      body,
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("YouTube Validation API Error:", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.detail || "Validation failed" },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
