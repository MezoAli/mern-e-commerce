import UsersTable from "@/components/admin/UsersTable";
import Metadata from "@/components/layout/Metadata";
import { Input } from "@/components/ui/input";
import { useGetAllUsersQuery } from "@/store/api/userApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Users = () => {
  const { data, isLoading, error, isError } = useGetAllUsersQuery();
  const [search, setSearch] = useState("");
  const filteredUsers = data?.users?.filter((user) => {
    return (
      user?.name.toLowerCase().includes(search.toLowerCase()) ||
      user?.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  if (isLoading) {
    return <p className="text-3xl text-center my-4 font-bold">Loading...</p>;
  }
  return (
    <>
      <Metadata title="Admin Users" />
      <Input
        type="text"
        placeholder="search by Name or E-mail"
        className="my-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {data?.users?.length > 0 && (
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 capitalize">
            {filteredUsers.length} Users
          </h3>
          <UsersTable users={filteredUsers} />
        </div>
      )}
    </>
  );
};

export default Users;
