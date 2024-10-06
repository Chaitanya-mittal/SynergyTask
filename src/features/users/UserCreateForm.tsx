import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Label from "../../ui/Label";
import useCreateUser from "./hooks/useCreateUser";
import { User } from "./interface/UserInterface";
import useEditUser from "./hooks/useEditUser";
import { useUserContext } from "../../context/UserProvider";
import Loader from "../../ui/Loader";

export const Error = styled.span`
  font-size: 0.8rem;
  color: red;
`;

// Define the form data interface based on the User's relevant fields
interface CabinFormData {
  name: string;
  email: string;
  street: string;
  city: string;
  company?: string;
  website?: string;
  username: string;
  phone: string;
}

interface UserCreateFormProps {
  handleForm?: () => void;
  editSession?: Partial<User>; // Edit session accepts partial User data for flexibility
}

function UserCreateForm({ handleForm, editSession = {} }: UserCreateFormProps) {
  const isEditSession = Boolean(Object.keys(editSession).length > 0);
  const { creatingUser, createUserFunc } = useCreateUser();
  const { editingUser, editUserFunc } = useEditUser();
  const { createdUsers, updateCreatedUser } = useUserContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CabinFormData>({
    defaultValues: {
      name: editSession?.name || "",
      email: editSession?.email || "",
      street: editSession?.address?.street || "",
      city: editSession?.address?.city || "",
      company: editSession?.company?.name || "",
      website: editSession?.website || "",
      username: editSession?.username || "",
      phone: editSession?.phone || "",
    },
  });

  const handleOnSubmit: SubmitHandler<CabinFormData> = (data) => {
    let newUser: User = {
      id: isEditSession ? editSession.id! : Math.random(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      username: "User-" + data.name,
      address: {
        street: data.street,
        city: data.city,
      },
    };

    if (data.company) {
      newUser = { ...newUser, company: { name: data.company } };
    }
    if (data.website) {
      newUser = { ...newUser, website: data.website };
    }

    if (isEditSession) {
      const ifCreated = createdUsers.find(
        (user: User) => user.id === newUser.id,
      );
      if (ifCreated) {
        updateCreatedUser(newUser);
      } else {
        editUserFunc({ id: String(newUser.id), newUser: newUser });
      }
    } else {
      createUserFunc(newUser);
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleOnSubmit)}>
      <FormRow className="flex flex-col sm:flex-row sm:items-center">
        <Label htmlFor="name">Name</Label>
        <div className="flex flex-col">
          <Input
            type="text"
            id="name"
            {...register("name", {
              required: "Please enter a user name.",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters long",
              },
            })}
          />
          {errors?.name && <Error>{errors.name.message}</Error>}
        </div>
      </FormRow>

      <FormRow className="flex flex-col sm:flex-row sm:items-center">
        <Label htmlFor="email">Email</Label>
        <div className="flex flex-col">
          <Input
            type="email"
            id="email"
            {...register("email", {
              required: "Please enter an email.",
            })}
          />
          {errors?.email && <Error>{errors?.email.message}</Error>}
        </div>
      </FormRow>

      <FormRow className="flex flex-col sm:flex-row sm:items-center">
        <Label htmlFor="phone">Phone Number</Label>
        <div className="flex flex-col">
          <Input
            type="tel"
            id="phone"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/, // Adjust regex to match your desired phone format
                message: "Enter a valid 10-digit phone number",
              },
            })}
          />
          {errors?.phone && <Error>{errors.phone.message}</Error>}
        </div>
      </FormRow>

      <FormRow className="flex flex-col sm:flex-row sm:items-center">
        <Label htmlFor="username">Username</Label>
        <div className="flex flex-col">
          <Input
            type="text"
            id="username"
            value={watch("name") ? "User-" + watch("name") : ""}
            {...register("username")}
            disabled
          />
          {errors?.username && <Error>{errors.username.message}</Error>}
        </div>
      </FormRow>

      <FormRow className="flex flex-col sm:flex-row sm:items-center">
        <Label htmlFor="company">Company</Label>
        <div className="flex flex-col">
          <Input type="text" id="company" {...register("company")} />
          {errors?.company && <Error>{errors.company.message}</Error>}
        </div>
      </FormRow>

      <FormRow className="flex flex-col sm:flex-row sm:items-center">
        <Label htmlFor="website">Website</Label>
        <div className="flex flex-col">
          <Input
            type="text"
            id="website"
            {...register("website", {
              pattern: {
                value:
                  // eslint-disable-next-line no-useless-escape
                  /^(https?:\/\/)?(www\.)?([a-zA-Z0-9\-]+\.[a-zA-Z]{2,})([\/\w\.-]*)*\/?$/,
                message: "Please enter a valid URL", // Custom error message
              },
            })}
          />
          {errors?.website && <Error>{errors.website.message}</Error>}
        </div>
      </FormRow>

      <FormRow className="flex flex-col sm:flex-row sm:items-center">
        <Label htmlFor="street">Street</Label>
        <div className="flex flex-col">
          <Input
            type="text"
            id="street"
            {...register("street", {
              required: "Please enter your street.",
            })}
          />
          {errors?.street && <Error>{errors.street.message}</Error>}
        </div>
      </FormRow>

      <FormRow className="flex flex-col sm:flex-row sm:items-center">
        <Label htmlFor="city">City</Label>
        <div className="flex flex-col">
          <Input
            type="text"
            id="city"
            {...register("city", {
              required: "Please enter your city.",
            })}
          />
          {errors?.city && <Error>{errors.city.message}</Error>}
        </div>
      </FormRow>

      <FormRow className="flex flex-col sm:flex-row sm:items-center">
        <Button
          variations="secondary"
          type="reset"
          sizes="small"
          onClick={handleForm}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          sizes="small"
          disabled={creatingUser || editingUser}
        >
          {creatingUser || editingUser ? <Loader /> : "Submit"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UserCreateForm;
