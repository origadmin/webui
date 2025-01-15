import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const data = [
  { country: "United States", revenue: "$12,345", users: "1,234" },
  { country: "United Kingdom", revenue: "$8,765", users: "876" },
  { country: "Germany", revenue: "$6,543", users: "654" },
  { country: "Japan", revenue: "$5,432", users: "543" },
  { country: "France", revenue: "$4,321", users: "432" },
]

export function GeographicDistribution() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Country</TableHead>
          <TableHead>Revenue</TableHead>
          <TableHead>Users</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.country}>
            <TableCell>{item.country}</TableCell>
            <TableCell>{item.revenue}</TableCell>
            <TableCell>{item.users}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

