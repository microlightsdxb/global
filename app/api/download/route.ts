import { NextResponse } from "next/server";
import { join } from "path";
import { readFile } from "fs/promises";

export async function GET() {
  const filePath = join(process.cwd(), "public/assets/Microlights Brochure.pdf");
  const file = await readFile(filePath); // Buffer

  // Convert Buffer → Uint8Array so TS accepts it
  const blob = new Blob([new Uint8Array(file)], { type: "application/pdf" });

  return new NextResponse(blob, {
    headers: {
      "Content-Disposition": 'attachment; filename="Microlights-Brochure.pdf"',
    },
  });
}
