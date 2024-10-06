import Table from "../../ui/Table";
import useUsers from "./hooks/useUsers";
import UserRow from "./UserRow";
import Menus from "../../ui/Menus";
import { User } from "./interface/UserInterface";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import UserCreateForm from "./UserCreateForm";
import { useUserContext } from "../../context/UserProvider";
import Loader from "../../ui/Loader";

function UserTable() {
  const { userList, loadingUserList } = useUsers();

  const { createdUsers, editedUsers, deleteUsersId } = useUserContext();

  if (loadingUserList) return <Loader />;
  // updating user content
  let updatedUserList = userList?.map((user: User) => {
    const ifEdited = editedUsers.find((eUser: User) => eUser.id === user.id);
    if (ifEdited) {
      return ifEdited;
    }
    return user;
  });

  updatedUserList = updatedUserList?.filter((user: User) => {
    const ifDeleted = deleteUsersId.find(
      (id: string) => id === String(user.id),
    );
    if (ifDeleted) {
      return false;
    }
    return true;
  });

  // removing deleted user

  const finalUserList = [...createdUsers, ...updatedUserList!];

  return (
    <section className="m-auto flex h-full w-full max-w-[60rem] flex-col gap-4">
      <Modal>
        <Modal.Open opens="createUser">
          <Button>Create </Button>
        </Modal.Open>
        <Modal.Window name="createUser">
          <UserCreateForm />
        </Modal.Window>
      </Modal>
      <Table columns="1.5fr 1.5fr 1.2fr  1fr">
        <Table.Header>
          <span>Name</span>
          <span>Contact</span>
          <span>Company</span>

          <span></span>
        </Table.Header>
        <Menus>
          <Table.Body
            data={finalUserList!}
            render={(data: User) => <UserRow user={data} key={data.id} />}
          />
        </Menus>
      </Table>
    </section>
  );
}

export default UserTable;
