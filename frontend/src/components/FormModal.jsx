import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

function FormModal({ items, show, setItems, handleClose, editItemName = "" }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [oldName, setOldName] = useState("");

  const handleSave = (e) => {
    e.preventDefault();

    if (editItemName === "") {
      const result = items.find((item) => item.name === name);
      if (result) {
        return toast.error("This item already exists");
      }

      setItems([
        ...items,
        {
          name,
          description,
          quantity: +quantity,
        },
      ]);
    } else {
      const newItem = { name, description, quantity };
      const newItems = items.map((item) =>
        item.name === oldName ? newItem : item
      );
      const itemsExceptOld = items.filter((item) => item.name !== oldName);
      const nameAlreadyUsed = itemsExceptOld.find(
        (item) => item.name === newItem.name
      );

      if (nameAlreadyUsed) {
        setName(oldName);
        return toast.error(
          "You have changed the name to one that is already used"
        );
      }

      console.log(nameAlreadyUsed);

      setItems(newItems);
    }

    setName(""), setDescription("");
    setQuantity(0);

    handleClose();
  };

  useEffect(() => {
    if (editItemName !== "") {
      const foundItem = items.find((item) => item.name === editItemName);
      setName(foundItem.name);
      setDescription(foundItem.description);
      setQuantity(foundItem.quantity);
      setOldName(foundItem.name);
    }
  }, [editItemName]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        style={{ borderRadius: "15px" }} // Ensure the modal maintains its rounded corners
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#f1f3f5",
            borderBottom: "1px solid #ddd",
            borderRadius: "15px 15px 0 0",
          }}
        >
          <Modal.Title
            style={{ fontSize: "1.5rem", fontWeight: "600", color: "#343a40" }}
          >
            {editItemName === "" ? "Add New Item" : "Edit Item"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{ backgroundColor: "#ffffff", padding: "30px 40px" }}
        >
          <Form onSubmit={handleSave}>
            {/* Name Input */}
            <Form.Group className="mb-4" controlId="itemName">
              <Form.Label style={{ fontWeight: "600", color: "#495057" }}>
                Item Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  borderRadius: "12px",
                  border: "1px solid #ced4da",
                  padding: "12px",
                  fontSize: "1.1rem",
                  backgroundColor: "#f8f9fa",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
                }}
              />
            </Form.Group>

            {/* Description Input */}
            <Form.Group className="mb-4" controlId="itemDescription">
              <Form.Label style={{ fontWeight: "600", color: "#495057" }}>
                Item Description (Optional)
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  borderRadius: "12px",
                  border: "1px solid #ced4da",
                  padding: "12px",
                  fontSize: "1.1rem",
                  backgroundColor: "#f8f9fa",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
                }}
              />
            </Form.Group>

            {/* Quantity Input */}
            <Form.Group className="mb-4" controlId="itemQuantity">
              <Form.Label style={{ fontWeight: "600", color: "#495057" }}>
                Quantity
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{
                  borderRadius: "12px",
                  border: "1px solid #ced4da",
                  padding: "12px",
                  fontSize: "1.1rem",
                  backgroundColor: "#f8f9fa",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
                }}
              />
            </Form.Group>

            {/* Save/Update Button */}
            <Button
              type="submit"
              variant="primary"
              style={{
                width: "100%",
                padding: "12px 20px",
                fontSize: "1.1rem",
                borderRadius: "12px",
              }}
            >
              {editItemName === "" ? "Save Item" : "Update Item"}
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer
          style={{
            backgroundColor: "#f1f3f5",
            borderTop: "1px solid #ddd",
            borderRadius: "0 0 15px 15px",
            fontSize: "0.9rem",
            fontWeight: "500",
            color: "#6c757d",
          }}
        >
          Procurement Portal
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormModal;
