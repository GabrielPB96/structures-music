const style = {
	width: "100%",
	display: "grid",
  justifyItems: "center",
  padding:"3rem"
};

const SearchEmpty = () => {
	return (
		<div style={style}>
			<h2>File not found</h2>
		</div>
	);
};

export default SearchEmpty;