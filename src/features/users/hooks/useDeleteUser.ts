import { useMutation } from "@tanstack/react-query"
import { deleteUser } from "../../../services/apiUsers"
import { useUserContext } from "../../../context/UserProvider"

function useDeleteUser() {
    const { addDeleteUserId } = useUserContext()
    const { mutate: deleteUserFunc, isPending: deletingUser } = useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: (id: string) => {
            addDeleteUserId(id);
        }
    })
    return { deleteUserFunc, deletingUser }
}

export default useDeleteUser
