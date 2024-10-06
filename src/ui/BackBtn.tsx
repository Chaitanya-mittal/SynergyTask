import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";

export default function BackBtn() {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(-1)}>
      <HiArrowLeft />
    </Button>
  );
}
