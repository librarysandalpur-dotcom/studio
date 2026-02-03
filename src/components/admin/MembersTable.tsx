import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const members = [
  {
    id: "m_001",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    avatar: "https://i.pravatar.cc/150?u=aarav",
    status: "Active",
    plan: "Annually",
    joinDate: "2023-01-15",
  },
  {
    id: "m_002",
    name: "Diya Patel",
    email: "diya.patel@example.com",
    avatar: "https://i.pravatar.cc/150?u=diya",
    status: "Active",
    plan: "Monthly",
    joinDate: "2024-05-10",
  },
  {
    id: "m_003",
    name: "Rohan Gupta",
    email: "rohan.gupta@example.com",
    avatar: "https://i.pravatar.cc/150?u=rohan",
    status: "Expired",
    plan: "Monthly",
    joinDate: "2024-03-01",
  },
  {
    id: "m_004",
    name: "Priya Singh",
    email: "priya.singh@example.com",
    avatar: "https://i.pravatar.cc/150?u=priya",
    status: "Active",
    plan: "Quarterly",
    joinDate: "2024-04-20",
  },
  {
    id: "m_005",
    name: "Arjun Kumar",
    email: "arjun.kumar@example.com",
    avatar: "https://i.pravatar.cc/150?u=arjun",
    status: "Inactive",
    plan: "Annually",
    joinDate: "2023-08-05",
  },
];

export function MembersTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden md:table-cell">Plan</TableHead>
          <TableHead className="hidden md:table-cell">Join Date</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="font-medium">
                  {member.name}
                  <div className="text-sm text-muted-foreground hidden md:inline">
                    {' - '}{member.email}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={member.status === 'Active' ? 'default' : 'destructive'} className={member.status === 'Active' ? 'bg-green-500' : ''}>
                {member.status}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">{member.plan}</TableCell>
            <TableCell className="hidden md:table-cell">{member.joinDate}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                   <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
