import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";

const errorLogs = [
  { timestamp: "2023-06-15 14:30:22", level: "ERROR", message: "Database connection failed" },
  { timestamp: "2023-06-15 14:35:10", level: "WARNING", message: "High memory usage detected" },
  { timestamp: "2023-06-15 14:40:05", level: "ERROR", message: "API endpoint /users/create returned 500" },
  { timestamp: "2023-06-15 14:45:30", level: "INFO", message: "Scheduled maintenance started" },
  { timestamp: "2023-06-15 14:50:15", level: "ERROR", message: "File upload failed: insufficient permissions" },
];

export function ErrorLogs() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Timestamp</TableHead>
          <TableHead>Level</TableHead>
          <TableHead>Message</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {errorLogs.map((log, index) => (
          <TableRow key={index}>
            <TableCell>{log.timestamp}</TableCell>
            <TableCell>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  log.level === "ERROR"
                    ? "bg-red-100 text-red-800"
                    : log.level === "WARNING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                }`}
              >
                {log.level}
              </span>
            </TableCell>
            <TableCell>{log.message}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
