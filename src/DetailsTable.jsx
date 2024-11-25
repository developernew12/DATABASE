import styles from "./DetailsTable.module.css";

const DetailsTable = ({ data, onRemove }) => {
  return (
    <>
      <table className={styles.container}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Aadhar</th>
            <th>Phone</th>
            <th>Address</th>
            <th>PAN</th>
            <th>ID</th>
            <th>Actions</th> {/* Add Actions column */}
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.name}</td>
              <td>{entry.aadhar}</td>
              <td>{entry.phone}</td>
              <td>{entry.address}</td>
              <td>{entry.pan}</td>
              <td>{entry.id}</td>
              <td>
                <button
                  onClick={() => onRemove(index)} // Call the remove handler
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DetailsTable;
