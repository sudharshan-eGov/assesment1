import { useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import Employees from "./Employees";
function Header() {
	const [input, setInput] = useState("");
	const [isPending, startTransition] = useTransition();
	const searchHandler = (e) => {
		startTransition(() => {
			setInput(e.target.value);
		});
		setInput(e.target.value);
	};
	const { t } = useTranslation();
	return (
		<div>
			<div className="pt-2 relative mx-auto text-gray-600 ">
				<input
					className="border-2 ml-5 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
					type="search"
					name="search"
					placeholder={t("Search(Name, Phone, Age...)")}
					onChange={searchHandler}
				/>
				<a
					href="/create"
					className=" absolute right-0  bg-blue-400 hover:bg-blue-700 text-white px-3 py-2 mr-10 rounded-md text-sm font-medium"
				>
					{t("Create Employee")}
				</a>
			</div>

			{isPending && <p>Updating List...</p>}
			<Employees search={input} />
		</div>
	);
}

export default Header;
