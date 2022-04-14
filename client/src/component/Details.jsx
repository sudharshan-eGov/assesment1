import { useNavigate } from "react-router-dom";
function Details() {
	// const url = "https://sudharshan";
	// const getEmployees = axios.get(url);

	// const { data, status } = useQuery("employees", getEmployees);
	const nav = useNavigate();

	return (
		<div>
			<nav>
				<button
					style={{ width: "14rem", fontSize: "small", float: "right" }}
					onClick={() => nav("/create")}
				>
					Create Employee
				</button>
			</nav>
		</div>
	);
}

export default Details;
