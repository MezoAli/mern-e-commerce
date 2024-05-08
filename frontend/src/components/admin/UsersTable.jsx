import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDeleteUserMutation } from "@/store/api/userApi";

const UsersTable = ({ users }) => {
  const [deleteUser, { isLoading, isSuccess, error, isError, data }] =
    useDeleteUserMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(data?.message, {
        duration: 4000,
      });
    }
  }, [isSuccess, isError]);

  if (isLoading) {
    return <p className="text-center text-2xl font-bold my-8">Loading...</p>;
  }

  return (
    <>
      <Table className="w-full col-span-1 md:col-span-3">
        <TableCaption>A list of all Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[130px]">User Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Joined At</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((item) => (
            <TableRow key={item?._id}>
              <TableCell className="font-bold">{item?._id}</TableCell>
              <TableCell>{item?.name}</TableCell>

              <TableCell>{item?.email}</TableCell>
              <TableCell>
                {new Date(item?.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="font-bold flex justify-center items-center gap-2">
                <Button variant="outline" className="text-green-500">
                  <Link to={`/admin/dashboard/orders/${item?._id}`}>
                    <Edit2Icon />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="text-red-500"
                  disabled={isLoading}
                  onClick={() => {
                    deleteUser(item?._id);
                  }}
                >
                  <Trash2Icon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default UsersTable;
