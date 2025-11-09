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

const users = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 234 567 8900",
    status: "active",
    joinDate: "2024-01-15",
    appointments: 12,
  },
  {
    id: 2,
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    phone: "+1 234 567 8901",
    status: "active",
    joinDate: "2024-02-20",
    appointments: 8,
  },
  {
    id: 3,
    name: "Robert Brown",
    email: "robert.brown@email.com",
    phone: "+1 234 567 8902",
    status: "inactive",
    joinDate: "2023-11-10",
    appointments: 5,
  },
  {
    id: 4,
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    phone: "+1 234 567 8903",
    status: "active",
    joinDate: "2024-03-05",
    appointments: 15,
  },
  {
    id: 5,
    name: "David Lee",
    email: "david.lee@email.com",
    phone: "+1 234 567 8904",
    status: "blocked",
    joinDate: "2023-09-12",
    appointments: 3,
  },
  {
    id: 6,
    name: "Sarah Martinez",
    email: "sarah.martinez@email.com",
    phone: "+1 234 567 8905",
    status: "active",
    joinDate: "2024-01-28",
    appointments: 10,
  },
]

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
}

export default function UsersTable({ filter }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [openId, setOpenId] = useState(null)

  // Đóng dropdown khi đổi filter hoặc search
  useEffect(() => {
    setOpenId(null)
  }, [filter, searchQuery])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = !filter || filter === "all" || user.status === filter
    return matchesSearch && matchesFilter
  })

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
              <TableHead className="font-semibold text-gray-700">User</TableHead>
              <TableHead className="font-semibold text-gray-700">Contact</TableHead>
              <TableHead className="font-semibold text-gray-700">Status</TableHead>
              <TableHead className="font-semibold text-gray-700">Join Date</TableHead>
              <TableHead className="font-semibold text-gray-700">Appointments</TableHead>
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
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {/* User */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src="/generic-placeholder-graphic.png" />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">ID: {user.id}</div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Contact */}
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-sm text-gray-700">
                        <Mail className="h-3.5 w-3.5 text-gray-400" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Phone className="h-3.5 w-3.5 text-gray-400" />
                        {user.phone}
                      </div>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${statusConfig[user.status].className}`}
                    >
                      {statusConfig[user.status].label}
                    </Badge>
                  </TableCell>

                  {/* Join Date */}
                  <TableCell className="text-sm text-gray-600">
                    {user.joinDate}
                  </TableCell>

                  {/* Appointments */}
                  <TableCell>
                    <span className="font-semibold text-gray-800">
                      {user.appointments}
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
                        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
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
  )
}