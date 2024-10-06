import { useMutation } from "@tanstack/react-query"
import { editUser } from "../../../services/apiUsers"
import { User } from "../interface/UserInterface";
import { useUserContext } from "../../../context/UserProvider";
import toast from "react-hot-toast";


function useEditUser() {
    const { addEditedUser } = useUserContext();
    const { mutate: editUserFunc, isPending: editingUser } = useMutation({
        mutationFn: ({ id, newUser }: { id: string, newUser: User }) => editUser({ id, newUser }),
        onSuccess: (data: User) => {
            addEditedUser(data);
            toast.success("user edited successfully");
        },
        onError: () => {
            toast.error("error while editing")
        }
    })
    return { editUserFunc, editingUser }
}

export default useEditUser;