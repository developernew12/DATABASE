import { useState } from "react";
import styles from "./inputPage.module.css";
import logImage from "./assets/logo 3.png";

const InputPage = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    aadhar: "",
    phone: "",
    address: "",
    pan: "",
    id: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    aadhar: "",
    phone: "",
    pan: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (["aadhar", "phone", "pan"].includes(name)) {
      validateDuplicates(name, value);
    }
  };

  const validateDuplicates = (fieldName, value) => {
    let error = "";
    if (value) {
      const isDuplicate = props.details.some(
        (entry) => entry[fieldName] === value
      );
      if (isDuplicate) {
        error = `This ${fieldName} is already in use.`;
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Revalidate all fields on submission
    ["aadhar", "phone", "pan"].forEach((field) => {
      validateDuplicates(field, formData[field]);
    });

    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (!hasErrors) {
      // Call the parent handleAdd function passed as props
      props.onSave(formData);
      setFormData({
        name: "",
        aadhar: "",
        phone: "",
        address: "",
        pan: "",
        id: "",
      });
      setErrors({
        name: "",
        aadhar: "",
        phone: "",
        pan: "",
      });
    } else {
      console.log("Fix validation errors before submitting.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoDiv}>
        <img src={logImage} alt="" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.containerItems}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>

        <div className={styles.containerItems}>
          <label>Aadhar</label>
          <input
            type="number"
            name="aadhar"
            value={formData.aadhar}
            onChange={handleChange}
            placeholder="Aadhar"
            required
          />
          {errors.aadhar && <span className={styles.error}>{errors.aadhar}</span>}
        </div>

        <div className={styles.containerItems}>
          <label>Phone</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />
          {errors.phone && <span className={styles.error}>{errors.phone}</span>}
        </div>

        <div className={styles.containerItems}>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
        </div>

        <div className={styles.containerItems}>
          <label>PAN</label>
          <input
            type="text"
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            placeholder="PAN"
            required
          />
          {errors.pan && <span className={styles.error}>{errors.pan}</span>}
        </div>

        <div className={styles.containerItems}>
          <label>Remarks</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Remarks"
            required
          />
        </div>

        <div className={styles.button}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default InputPage;
