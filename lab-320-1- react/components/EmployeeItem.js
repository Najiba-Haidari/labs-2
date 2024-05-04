const styles = {
  listStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  liStyle: {
    border: "1px solid orange",
    // margin: "0 auto",
    gap: "5px",
    marginBottom: "5px",
    backgroundColor: "orange",
    width: "100%",
    height: "fit-content",
    display: "flex",
    alignItems: "left",
  },
  hColor: {
    color: "gray",
    float: "left",
    margin: "0",
  },
  image: {
    width: "15%",
    heigh: "",
    float: "left",
    borderRadius: "50%",
    margin: "10px",
  },
};

const employees = [
  {
    name: "John Doe",
    id: 1,
    position: "Manager",
    imageUrl: "https://picsum.photos/200",
  },
  {
    name: "Jane Smith",
    id: 2,
    position: "Developer",
    imageUrl: "https://picsum.photos/200",
  },
  {
    name: "David Johnson",
    id: 3,
    position: "Designer",
    imageUrl: "https://picsum.photos/200",
  },
  {
    name: "Boss Mo",
    id: 3,
    position: "CEO",
    imageUrl: "https://picsum.photos/200",
  },
  {
    name: "Name me",
    id: 3,
    position: "Director",
    imageUrl: "https://picsum.photos/200",
  },
];

export default function EmployeeItem() {
  return (
    <>
      <div style={styles.listStyle}>
        {employees.map(function (item) {
          return (
            <div style={styles.liStyle}>
              <img style={styles.image} src={item.imageUrl} />
              <div style={{ marginRight: "300px" }}>
                <h2>{item.name}</h2>
                <h3 style={styles.hColor}>{item.position}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
