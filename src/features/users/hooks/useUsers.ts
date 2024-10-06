import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../services/apiUsers";
import { User } from "../interface/UserInterface";

function useUsers() {
  const { data: userList, isLoading: loadingUserList } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
  return { userList, loadingUserList };
}

export default useUsers;
