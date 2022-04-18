import { useNavigate } from "react-router-dom";
function Details() {
	// const url = "https://sudharshan";
	// const getEmployees = axios.get(url);

	// const { data, status } = useQuery("employees", getEmployees);
	const nav = useNavigate();

	return (
		<div>
			<nav className="bg-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-end h-16">
						<div className="flex items-end">
							<div className="hidden md:block">
								<div className="ml-10 flex items-baseline space-x-4">
									<a
										href="/create"
										className=" bg-gray-400 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
									>
										Create Employee
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default Details;
