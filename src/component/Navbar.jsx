import { useState, useTransition } from "react";
import logo from "../assests/logo.png";
import Employees from "./Employees";
function Navbar() {
	const [input, setInput] = useState("");
	const [isPending, startTransition] = useTransition();
	const searchHandler = (e) => {
		startTransition(() => {
			setInput(e.target.value);
		});
		setInput(e.target.value);
	};

	return (
		<div>
			<nav className="bg-gray-800 ">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
					<div className="flex flex-wrap items-center justify-end h-16 ">
						<div className="flex items-end">
							<div className="md:block sm:ml-30">
								<div className="ml-10 flex items-baseline space-x-4">
									<img
										src={logo}
										className="h-10 w-45 absolute left-0 ml-10"
										alt=""
									/>
									<a
										href="/create"
										className=" bg-blue-400 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium"
									>
										Create Employee
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>

			<div className="pt-2 relative mx-auto text-gray-600">
				<input
					className="border-2 ml-5 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
					type="search"
					name="search"
					placeholder="Search(Name, Phone, Age...)"
					onChange={searchHandler}
				/>
			</div>

			{isPending && <p>Updating List...</p>}
			<Employees search={input} />
		</div>
	);
}

export default Navbar;
