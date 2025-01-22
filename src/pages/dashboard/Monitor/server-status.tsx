import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const servers = [
  { name: "Web Server 1", status: "Operational", load: "32%" },
  { name: "Web Server 2", status: "Operational", load: "28%" },
  { name: "Database Server", status: "Operational", load: "45%" },
  { name: "Cache Server", status: "Warning", load: "78%" },
  { name: "Backup Server", status: "Operational", load: "12%" },
];

export function ServerStatus() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Server</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Load</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {servers.map((server) => (
          <TableRow key={server.name}>
            <TableCell>{server.name}</TableCell>
            <TableCell>
              <Badge variant={server.status === "Operational" ? "default" : "destructive"}>{server.status}</Badge>
            </TableCell>
            <TableCell>{server.load}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
