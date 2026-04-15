import { readFile, writeFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "tasks.json");

// GET (ambil semua task)
export async function GET() {
  const data = await readFile(filePath, "utf-8");
  return Response.json(JSON.parse(data));
}

// POST (tambah task)
export async function POST(req) {
  const body = await req.json();
  const data = JSON.parse(await readFile(filePath, "utf-8"));

  const newTask = {
    id: Date.now(),
    text: body.text,
    completed: false,
  };

  data.push(newTask);
  await writeFile(filePath, JSON.stringify(data, null, 2));

  return Response.json(newTask);
}

// PUT (update task)
export async function PUT(req) {
  const body = await req.json();
  let data = JSON.parse(await readFile(filePath, "utf-8"));

  data = data.map((task) =>
    task.id === body.id ? { ...task, ...body } : task,
  );

  await writeFile(filePath, JSON.stringify(data, null, 2));

  return Response.json({ message: "Updated" });
}

// DELETE (hapus task)
export async function DELETE(req) {
  const body = await req.json();
  let data = JSON.parse(await readFile(filePath, "utf-8"));

  data = data.filter((task) => task.id !== body.id);

  await writeFile(filePath, JSON.stringify(data, null, 2));

  return Response.json({ message: "Deleted" });
}
