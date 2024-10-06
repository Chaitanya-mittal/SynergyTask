import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="absolute left-0 top-0 z-[100000] flex h-screen w-screen items-center justify-center bg-white/10 backdrop-blur-sm">
      <ClipLoader />
    </div>
  );
}
