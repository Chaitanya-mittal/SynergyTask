import { useMutation } from "@tanstack/react-query"
import { createUser } from "../../../services/apiUsers"
import { User } from "../interface/UserInterface";
import { useUserContext } from "../../../context/UserProvider";
import toast from "react-hot-toast";

function useCreateUser() {
    const { addCreatedUser } = useUserContext();
    const { mutate: createUserFunc, isPending: creatingUser } = useMutation({
        mutationFn: (newUser: User) => createUser(newUser),
        onSuccess: (data: User) => {
            addCreatedUser(data);
            toast.success("User created Successfully");
        },
        onError: () => toast.error("Unable to create User")
    })
    return { createUserFunc, creatingUser }
}

export default useCreateUser;