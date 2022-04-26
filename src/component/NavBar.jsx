import logo from "../assests/logo.png";
export default function NavBar() {
	return (
		<div>
			<nav className="bg-gray-800 ">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
					<div className="flex flex-wrap items-center justify-end h-16 ">
						<div className="md:block sm:ml-30">
							<div className="ml-10 flex items-baseline space-x-4">
								<img
									src={logo}
									className="h-10 w-45 absolute left-0 top-3 ml-10"
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
}
