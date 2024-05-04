import Header from "../components/Header.js";
import SearchBar from "../components/SearchBar.js";
import EmployeeList from "../components/EmployeeList.js";
// import EmployeeItem from "../components/EmployeeItem.js";

export default function HomePage() {
  return (
    <>
      <Header />
      <SearchBar />
      <EmployeeList>{/* <EmployeeItem /> */}</EmployeeList>
    </>
  );
}
