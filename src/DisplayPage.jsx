import { useState, useEffect } from "react";
import DetailsTable from "./DetailsTable";
import styles from './DisplayPage.module.css';

const DisplayPage = ({ data }) => {
  const [dataList, setDataList] = useState(() => {
    const savedData = localStorage.getItem("details");
    return savedData ? JSON.parse(savedData) : data;
  });

  const [searchQuery, setSearchQuery] = useState("");

  // Keep `dataList` and `localStorage` in sync
  useEffect(() => {
    localStorage.setItem("details", JSON.stringify(dataList));
  }, [dataList]);

  const filteredData = dataList.filter((entry) =>
    Object.values(entry).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Remove a user and update localStorage
  const handleRemove = (index) => {
    const updatedData = dataList.filter((_, i) => i !== index);
    setDataList(updatedData);
  };

  // Check for duplicates
  const isDuplicate = (newEntry) => {
    return dataList.some(
      (entry) =>
        entry.aadhar === newEntry.aadhar || entry.phone === newEntry.phone
    );
  };

  // Add a new user
  const handleAdd = (newEntry) => {
    if (isDuplicate(newEntry)) {
      alert("User already exists!");
      return;
    }
    const updatedData = [...dataList, newEntry];
    setDataList(updatedData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerItems}>
        <label>Search -</label>
        <input
          type="text"
          id="search"
          placeholder="Search by any detail..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className={styles.containerItem2}>
        <DetailsTable data={filteredData} onRemove={handleRemove} />
      </div>
    </div>
  );
};

export default DisplayPage;
