import AdminContext from "@/context/AdminContext";
import { useContext } from "react";

const AdminGridPhotos = () => {
  const { photos, setPhotos } = useContext(AdminContext);
  return <div>AdminGridPhotos</div>;
};

export default AdminGridPhotos;
