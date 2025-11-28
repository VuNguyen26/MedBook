import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Download,
  Eye,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import paymentApi from "@/api/paymentApi";
import { toast } from "react-toastify";

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
};

const methodConfig = {
  "Credit Card": { className: "bg-blue-100 text-blue-700" },
  "Debit Card": { className: "bg-blue-100 text-blue-700" },
  Cash: { className: "bg-green-100 text-green-700" },
  Insurance: { className: "bg-sky-100 text-sky-700" },
};

export default function PaymentsTable({ filter }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState(null); // ✅ Thêm state điều khiển dropdown

  const statusOptions = ["completed", "pending", "failed"];

  // Fetch payments data
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const response = await paymentApi.getAll();
        // Assuming the API returns payments in response.data
        setPayments(response.data || []);
      } catch (err) {
        console.error("Error fetching payments:", err);
        setError(err.message || "Failed to fetch payments");
        toast.error("Failed to load payments data");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleChangeStatus = async (payment, newStatus) => {
    if (!payment?.id || payment.status === newStatus) return;

    try {
      const response = await paymentApi.updateStatus(payment.id, newStatus);
      const updated = response.data;

      setPayments((prev) =>
        prev.map((p) =>
          p.id === updated.id ? { ...p, status: updated.status } : p
        )
      );

      toast.success(
        `Cập nhật trạng thái payment #${payment.id} thành "${newStatus}"`
      );
    } catch (err) {
      console.error("Error updating payment status:", err);
      toast.error("Không thể cập nhật trạng thái thanh toán");
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      (payment.patientName || payment.patient?.name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (payment.id || payment.paymentId || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (payment.doctorName || payment.doctor?.name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesFilter =
      !filter || filter === "all" || (payment.status || "pending") === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-500">Loading payments...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <p className="text-red-500 mb-4">Error: {error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
                <TableCell
                  colSpan={9}
                  className="text-center text-gray-500 py-6"
                >
                  No payments found
                </TableCell>
              </TableRow>
            ) : (
              filteredPayments.map((payment) => (
                <TableRow key={payment.id || payment.paymentId}>
                  <TableCell className="font-mono text-sm">
                    {payment.id || payment.paymentId || "N/A"}
                  </TableCell>
                  <TableCell className="font-medium">
                    {payment.patientName ||
                      payment.patient?.name ||
                      "Unknown Patient"}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {payment.doctorName ||
                      payment.doctor?.name ||
                      "Unknown Doctor"}
                  </TableCell>
                  <TableCell className="text-sm">
                    {payment.service || payment.appointment?.service || "N/A"}
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${payment.amount || payment.totalAmount || 0}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        (
                          methodConfig[
                            payment.method || payment.paymentMethod || "Cash"
                          ] || methodConfig["Cash"]
                        ).className
                      }
                    >
                      {payment.method || payment.paymentMethod || "Cash"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        (
                          statusConfig[payment.status || "pending"] ||
                          statusConfig["pending"]
                        ).className
                      }
                    >
                      {
                        (
                          statusConfig[payment.status || "pending"] ||
                          statusConfig["pending"]
                        ).label
                      }
                    </Badge>
                  </TableCell>

                  <TableCell className="text-sm text-gray-500">
                    {payment.createdAt || payment.date
                      ? new Date(
                          payment.createdAt || payment.date
                        ).toLocaleString()
                      : "N/A"}
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
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                        {statusOptions.map((status) => (
                          <DropdownMenuItem
                            key={status}
                            disabled={(payment.status || "pending") === status}
                            onClick={() => {
                              setOpenId(null);
                              handleChangeStatus(payment, status);
                            }}
                          >
                            <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600" />
                            {statusConfig[status]?.label ?? status}
                          </DropdownMenuItem>
                        ))}
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
  );
}
