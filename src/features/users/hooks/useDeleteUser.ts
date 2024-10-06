import { useMutation } from "@tanstack/react-query"
import { deleteUser } from "../../../services/apiUsers"
import { useUserContext } from "../../../context/UserProvider"
import toast from "react-hot-toast"

function useDeleteUser() {
    const { addDeleteUserId } = useUserContext()
    const { mutate: deleteUserFunc, isPending: deletingUser } = useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: (id: string) => {
            addDeleteUserId(id);
            toast.success(`User ${id} deleted successfully`);
        },
        onError: () => toast.error("Unable to delete user")
    })
    return { deleteUserFunc, deletingUser }
}

export default useDeleteUser
