import styled from "styled-components";
import useUserById from "./hooks/useUserById";
import BackBtn from "../../ui/BackBtn";
import { User } from "./interface/UserInterface";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserProvider";
import Loader from "../../ui/Loader";

const UserDetailsContainer = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: 600px;
  margin: 1rem auto;
`;

const UserDetailItem = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailLabel = styled.span`
  font-weight: bold;
  color: #555;
`;

const DetailValue = styled.span`
  color: #333;
`;

const SectionTitle = styled.h3`
  margin: 0.5rem 0;
  font-size: 1.2rem;
  color: #007bff;
`;

const UserDetails = () => {
  const { id } = useParams();
  const { user, loadingUser } = useUserById();
  const { createdUsers } = useUserContext();
  let userForId = user;
  if (loadingUser) {
    return <Loader />;
  }
  if (!user) {
    const ifCreatedUser = createdUsers.find(
      (user: User) => String(user.id) === id,
    );
    if (ifCreatedUser) {
      userForId = ifCreatedUser;
    } else {
      return <p>No suck user</p>;
    }
  }
  return (
    <UserDetailsContainer>
      <BackBtn />
      <SectionTitle>User Information</SectionTitle>
      <UserDetailItem>
        <DetailLabel>ID:</DetailLabel>
        <DetailValue>{userForId!.id}</DetailValue>
      </UserDetailItem>

      <UserDetailItem>
        <DetailLabel>Name:</DetailLabel>
        <DetailValue>{userForId!.name}</DetailValue>
      </UserDetailItem>

      <UserDetailItem>
        <DetailLabel>Username:</DetailLabel>
        <DetailValue>{userForId!.username}</DetailValue>
      </UserDetailItem>

      <UserDetailItem>
        <DetailLabel>Email:</DetailLabel>
        <DetailValue>{userForId!.email}</DetailValue>
      </UserDetailItem>

      <UserDetailItem>
        <DetailLabel>Phone:</DetailLabel>
        <DetailValue>{userForId!.phone}</DetailValue>
      </UserDetailItem>

      {userForId!.website && (
        <UserDetailItem>
          <DetailLabel>Website:</DetailLabel>
          <DetailValue>
            <a
              href={`https://${userForId!.website}`}
              target="_blank"
              rel="noreferrer"
            >
              {user!.website}
            </a>
          </DetailValue>
        </UserDetailItem>
      )}

      {userForId!.address && (
        <>
          <SectionTitle>Address</SectionTitle>
          <UserDetailItem>
            <DetailLabel>Street:</DetailLabel>
            <DetailValue>{userForId!.address.street || "N/A"}</DetailValue>
          </UserDetailItem>

          <UserDetailItem>
            <DetailLabel>City:</DetailLabel>
            <DetailValue>{userForId!.address.city}</DetailValue>
          </UserDetailItem>

          {userForId!.address.zipcode && (
            <UserDetailItem>
              <DetailLabel>Zipcode:</DetailLabel>
              <DetailValue>{userForId!.address.zipcode}</DetailValue>
            </UserDetailItem>
          )}

          {userForId!.address.geo && (
            <UserDetailItem>
              <DetailLabel>Geo:</DetailLabel>
              <DetailValue>
                Lat: {userForId!.address.geo.lat}, Lng:{" "}
                {userForId!.address.geo.lng}
              </DetailValue>
            </UserDetailItem>
          )}
        </>
      )}

      {userForId!.company && (
        <>
          <SectionTitle>Company</SectionTitle>
          <UserDetailItem>
            <DetailLabel>Company Name:</DetailLabel>
            <DetailValue>{userForId!.company.name}</DetailValue>
          </UserDetailItem>

          {userForId!.company.catchPhrase && (
            <UserDetailItem>
              <DetailLabel>CatchPhrase:</DetailLabel>
              <DetailValue>{userForId!.company.catchPhrase}</DetailValue>
            </UserDetailItem>
          )}

          {userForId!.company.bs && (
            <UserDetailItem>
              <DetailLabel>Business Strategy:</DetailLabel>
              <DetailValue>{userForId!.company.bs}</DetailValue>
            </UserDetailItem>
          )}
        </>
      )}
    </UserDetailsContainer>
  );
};

export default UserDetails;
