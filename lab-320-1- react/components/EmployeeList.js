import EmployeeItem from "./EmployeeItem";

const styles = {
  margin: "5px auto",
  // border: "1px solid red",
  width: "100%",
  height: "100vh",
};

export default function EmployeeList() {
  return (
    <>
      <div style={styles}>
        <EmployeeItem />
      </div>
    </>
  );
}
