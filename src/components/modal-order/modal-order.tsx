import Modal from "../modal/modal";
import OrderDetailsPage from "../../pages/order-details/order-details";
import { useNavigate, useParams } from "react-router-dom";

export default function ModalOrder() {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <Modal
      headingType="digits"
      onClose={() => navigate(-1)}
      title={`#${params.id}`}
    >
      <OrderDetailsPage />
    </Modal>
  );
}
