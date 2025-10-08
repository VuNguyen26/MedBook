import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Download, Eye, RefreshCw } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

const payments = [
  {
    id: "PAY-001",
    patient: "John Smith",
    doctor: "Dr. Sarah Johnson",
    amount: 250,
    method: "Credit Card",
    status: "completed",
    date: "2024-03-15 09:30",
    service: "Cardiology Consultation",
  },
  {
    id: "PAY-002",
    patient: "Emma Wilson",
    doctor: "Dr. Michael Chen",
    amount: 180,
    method: "Insurance",
    status: "pending",
    date: "2024-03-15 10:15",
    service: "Neurology Check-up",
  },
  {
    id: "PAY-003",
    patient: "Robert Brown",
    doctor: "Dr. Emily Davis",
    amount: 120,
    method: "Cash",
    status: "completed",
    date: "2024-03-15 11:00",
    service: "Pediatric Consultation",
  },
  {
    id: "PAY-004",
    patient: "Lisa Anderson",
    doctor: "Dr. James Wilson",
    amount: 450,
    method: "Credit Card",
    status: "failed",
    date: "2024-03-15 14:00",
    service: "Orthopedic Surgery",
  },
  {
    id: "PAY-005",
    patient: "David Lee",
    doctor: "Dr. Maria Garcia",
    amount: 95,
    method: "Debit Card",
    status: "completed",
    date: "2024-03-15 15:30",
    service: "Dermatology Consultation",
  },
  {
    id: "PAY-006",
    patient: "Sarah Martinez",
    doctor: "Dr. Robert Taylor",
    amount: 320,
    method: "Insurance",
    status: "pending",
    date: "2024-03-15 16:00",
    service: "General Surgery",
  },
]

const statusConfig = {
  completed: {
    label: "Completed",
    className: "bg-green-100 text-green-700",
  },
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-700",
  },
  failed: {
    label: "Failed",
    className: "bg-red-100 text-red-700",
  },
}

const methodConfig = {
  "Credit Card": { className: "bg-blue-100 text-blue-700" },
  "Debit Card": { className: "bg-blue-100 text-blue-700" },
  Cash: { className: "bg-green-100 text-green-700" },
  Insurance: { className: "bg-sky-100 text-sky-700" },
}

export default function PaymentsTable({ filter }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [openId, setOpenId] = useState(null) // ✅ Thêm state điều khiển dropdown

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.doctor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      !filter || filter === "all" || payment.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search by patient, doctor, or transaction ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="rounded-md border border-border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredPayments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-gray-500 py-6">
                  No payments found
                </TableCell>
              </TableRow>
            ) : (
              filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-mono text-sm">{payment.id}</TableCell>
                  <TableCell className="font-medium">{payment.patient}</TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {payment.doctor}
                  </TableCell>
                  <TableCell className="text-sm">{payment.service}</TableCell>
                  <TableCell className="font-semibold">${payment.amount}</TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={methodConfig[payment.method].className}
                    >
                      {payment.method}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusConfig[payment.status].className}
                    >
                      {statusConfig[payment.status].label}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-sm text-gray-500">
                    {payment.date}
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        onClick={() =>
                          setOpenId(openId === payment.id ? null : payment.id)
                        }
                      >
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        side="bottom"
                        sideOffset={6}
                        open={openId === payment.id}
                        onClose={() => setOpenId(null)}
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setOpenId(null)}>
                          <Eye className="mr-2 h-4 w-4 text-blue-500" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setOpenId(null)}>
                          <Download className="mr-2 h-4 w-4 text-green-600" />
                          Download Receipt
                        </DropdownMenuItem>
                        {payment.status === "failed" && (
                          <DropdownMenuItem onClick={() => setOpenId(null)}>
                            <RefreshCw className="mr-2 h-4 w-4 text-yellow-600" />
                            Retry Payment
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
