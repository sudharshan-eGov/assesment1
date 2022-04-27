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
								<select
									className="form-select form-select-lg appearance-none block max-w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
									aria-label=".form-select-lg example"
									name="Select your Language"
									id=""
									onChange={(e) => handleClick(e.target.value)}
								>
									<option value="#">Choose Language</option>
									<option value="en">English</option>
									<option value="hi">Hindi</option>
									<option value="te">Telugu</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
}
