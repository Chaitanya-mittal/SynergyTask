import { useQuery } from "@tanstack/react-query";
import { getUserById, } from "../../../services/apiUsers";
import { User } from "../interface/UserInterface";
import { useParams } from "react-router-dom";

function useUserById() {
    const { id } = useParams();

    const { data: user, isLoading: loadingUser } = useQuery<User>({
        queryKey: ["user", id],
        queryFn: () => getUserById(id!),
    });
    return { user, loadingUser };
}

export default useUserById;
