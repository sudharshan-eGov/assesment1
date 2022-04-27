import i18next from "i18next";
import { useTranslation } from "react-i18next";
import logo from "../assests/logo.png";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}
export default function NavBar() {
	function handleClick(lang) {
		i18next.changeLanguage(lang);
	}
	const { t } = useTranslation();

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

								<button
									className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded m-1"
									onClick={() => handleClick("en")}
								>
									English
								</button>
								<button
									className=" bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded m-1"
									onClick={() => handleClick("hi")}
								>
									{t("Hindi")}
								</button>

								<button
									className=" bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded m-1"
									onClick={() => handleClick("te")}
								>
									{t("Telugu")}
								</button>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
}
