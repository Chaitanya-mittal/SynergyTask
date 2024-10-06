import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import { HiMiniEye, HiMiniPencil, HiMiniTrash } from "react-icons/hi2";
import { User } from "./interface/UserInterface";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteUser from "./hooks/useDeleteUser";
import UserCreateForm from "./UserCreateForm";
import { Link } from "react-router-dom";

function UserRow({ user }: { user: User }) {
  const { deleteUserFunc, deletingUser } = useDeleteUser();

  return (
    <Table.Row>
      <span className="text-[10px] sm:text-sm"> {user.name}</span>

      <span className="text-[10px] sm:text-sm">{user.phone}</span>

      <span className="text-[10px] sm:text-sm"> {user.address?.city}</span>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle opens={String(user.id)} />

            <Menus.List name={String(user.id)}>
              <Modal.Open opens="deleteButton">
                <Menus.Button>
                  <HiMiniTrash />
                  <span>Delete</span>
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="editButton">
                <Menus.Button>
                  <HiMiniPencil />
                  <span>Edit</span>
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="seeDetails">
                <Menus.Button>
                  <HiMiniEye />
                  <Link to={`/users/${user.id}`}>See Details</Link>
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="deleteButton">
              <ConfirmDelete
                disabled={deletingUser}
                resourceName="user"
                onConfirm={() => {
                  deleteUserFunc(String(user.id));
                }}
              />
            </Modal.Window>
            <Modal.Window name="editButton">
              <UserCreateForm editSession={user} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default UserRow;
