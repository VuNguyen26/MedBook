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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MoreHorizontal,
  Mail,
  Phone,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
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
import userApi from "@/api/userApi";
import { toast } from "react-toastify";

const statusConfig = {
  active: {
    label: "Active",
    className: "bg-green-100 text-green-700",
  },
  inactive: {
    label: "Inactive",
    className: "bg-yellow-100 text-yellow-700",
  },
  blocked: {
    label: "Blocked",
    className: "bg-red-100 text-red-700",
  },
};

export default function UsersTable({ filter }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState(null);

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await userApi.getAll();
        // Assuming the API returns users in response.data
        // You may need to adjust based on actual API response structure
        setUsers(response.data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message || "Failed to fetch users");
        toast.error("Failed to load users data");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Đóng dropdown khi đổi filter hoặc search
  useEffect(() => {
    setOpenId(null);
  }, [filter, searchQuery]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.name || user.fullName || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (user.email || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      !filter || filter === "all" || (user.status || "active") === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-500">Loading users...</p>
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
      <div className="flex items-center justify-between">
        <Input
          placeholder="🔍 Search users by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="relative rounded-xl border border-gray-200 shadow-sm bg-white">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold text-gray-700">
                User
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Contact
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Status
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Join Date
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Appointments
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground py-6"
                >
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow
                  key={user.id || user.userId}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {/* User */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage
                          src={
                            user.avatar || "/generic-placeholder-graphic.png"
                          }
                        />
                        <AvatarFallback>
                          {(user.name || user.fullName || "U")
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">
                          {user.name || user.fullName || "Unknown User"}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {user.id || user.userId}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Contact */}
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-sm text-gray-700">
                        <Mail className="h-3.5 w-3.5 text-gray-400" />
                        {user.email || "No email"}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Phone className="h-3.5 w-3.5 text-gray-400" />
                        {user.phone || user.phoneNumber || "No phone"}
                      </div>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                        (
                          statusConfig[user.status || "active"] ||
                          statusConfig["active"]
                        ).className
                      }`}
                    >
                      {
                        (
                          statusConfig[user.status || "active"] ||
                          statusConfig["active"]
                        ).label
                      }
                    </Badge>
                  </TableCell>

                  {/* Join Date */}
                  <TableCell className="text-sm text-gray-600">
                    {user.createdAt || user.joinDate || user.registrationDate
                      ? new Date(
                          user.createdAt ||
                            user.joinDate ||
                            user.registrationDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </TableCell>

                  {/* Appointments */}
                  <TableCell>
                    <span className="font-semibold text-gray-800">
                      {user.appointmentsCount || user.appointmentCount || 0}
                    </span>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        onClick={() =>
                          setOpenId(openId === user.id ? null : user.id)
                        }
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-gray-100"
                        >
                          <MoreHorizontal className="h-4 w-4 text-gray-600" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        side="bottom"
                        sideOffset={6}
                        open={openId === user.id}
                        onClose={() => setOpenId(null)}
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem onClick={() => setOpenId(null)}>
                          <Edit className="mr-2 h-4 w-4 text-blue-500" />
                          Edit User
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => setOpenId(null)}>
                          <Mail className="mr-2 h-4 w-4 text-teal-500" />
                          Send Email
                        </DropdownMenuItem>

                        {user.status === "blocked" ? (
                          <DropdownMenuItem onClick={() => setOpenId(null)}>
                            <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                            Unblock User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => setOpenId(null)}>
                            <Ban className="mr-2 h-4 w-4 text-yellow-600" />
                            Block User
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => setOpenId(null)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete User
                        </DropdownMenuItem>
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
