import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import Button from "@material-tailwind/react/Button";
import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
export default function Employees({ search }) {
	const client = useQueryClient();
	const nav = useNavigate();
	const [sort, setSort] = useState(true);
	const url = "http://localhost:8080/employees";
	const getEmployeeData = async () => await axios.get(url);

	const { data, isLoading, error, isFetching } = useQuery(
		"allemployees",
		getEmployeeData
	);

	const urlDelete = (id) =>
		axios.delete(`http://localhost:8080/delete_employee/${id}`);
	const DeleteEmployee = useMutation(urlDelete, {
		onSuccess: () => {
			client.invalidateQueries("allemployees");
		},
		onSettled: () => {
			client.invalidateQueries("allemployees");
		},
	});
	const asc = (a, b) => {
		return a.username.localeCompare(b.username);
	};
	const desc = (a, b) => {
		return b.username.localeCompare(a.username);
	};
	const { t } = useTranslation();
	if (isLoading) return <h1>Loading...</h1>;
	if (error) return <h1>Error...</h1>;

	return (
		<div>
			{isFetching ? (
				<div>Refreshing...</div>
			) : (
				<div className="flex flex-col">
					<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
							<div className="overflow-hidden">
								<table className="min-w-full">
									<thead className="border-b bg-gray-300">
										<tr>
											<th
												scope="col"
												className="text-sm font-extrabold text-gray-900 px-6 py-4 text-left border-r-2"
											>
												{t("Sl_No.")}
											</th>
											<th
												scope="col"
												className="text-sm font-extrabold text-gray-900 px-6 py-4 text-left  border-r-2"
											>
												<div className="ml-2  justify-around inline-flex">
													<div>{t("Name")}</div>
													&nbsp;{" "}
													<Button
														ripple="light"
														onClick={() => setSort(true)}
														className=" bg-blue-400 hover:bg-blue-700 text-white  px-1 rounded-md text-bold font-sm "
													>
														{t("ASC")} &#8593;
													</Button>
													<Button
														ripple="light"
														onClick={() => setSort(false)}
														className=" bg-blue-400 hover:bg-blue-700 text-white  px-1 rounded-md text-bold font-sm ml-2 md:768"
													>
														{t("DESC")} &#8595;
													</Button>
												</div>
											</th>
											<th
												scope="col"
												className="text-sm font-extrabold text-gray-900 px-6 py-4 text-left border-r-2"
											>
												{t("Email")}
											</th>
											<th
												scope="col"
												className="text-sm font-extrabold text-gray-900 px-6 py-4 text-left border-r-2"
											>
												{t("Department")}
											</th>
											<th
												scope="col"
												className="text-sm font-extrabold text-gray-900 px-6 py-4 text-left border-r-2"
											>
												{t("Mobile")}
											</th>
											<th
												scope="col"
												className="text-sm font-extrabold text-gray-900 px-6 py-4 text-left border-r-2"
											>
												{t("Age")}
											</th>
											<th
												scope="col"
												className="text-sm font-extrabold text-gray-900 px-6 py-4 text-left border-r-2"
											>
												{t("Actions")}
											</th>
										</tr>
									</thead>
									<tbody>
										{data?.data
											?.filter((val) => {
												if (search == "") {
													return val;
												} else if (
													val.username
														.toLowerCase()
														.includes(search.toLowerCase()) ||
													val.phonenumber
														.toLowerCase()
														.includes(search.toLowerCase()) ||
													val.age.toString().includes(search.toString())
												) {
													return val;
												}
											})
											.sort(sort ? asc : desc)

											.map((val, index) => (
												<tr className="border-b" key={index}>
													<td className="px-6 whitespace-nowrap text-sm font-extrabold text-gray-900 border-r-2 ">
														{index + 1}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 whitespace-nowrap border-r-2">
														{val.username}
													</td>
													<td className="text-sm text-gray-900 font-light px-6  whitespace-nowrap border-r-2">
														{val.email}
													</td>
													<td className="text-sm text-gray-900 font-light px-6  whitespace-nowrap border-r-2">
														{val.department.department}
													</td>
													<td className="text-sm text-gray-900 font-light px-6  whitespace-nowrap border-r-2">
														{val.phonenumber}
													</td>
													<td className="text-sm text-gray-900 font-light px-6  whitespace-nowrap border-r-2">
														{val.age}
													</td>

													<td className="text-lg text-gray-900 font-light px-4  whitespace-nowrap border-r-2">
														<div className="flex">
															<Button
																ripple="light"
																className="text-sm font-bold rounded p-2 border text-white bg-gray-400 hover:bg-gray-700 cursor-pointer "
																onClick={() => nav(`/update/${val.id}`)}
															>
																{" "}
																<PencilAltIcon className="h-5 w-5 " />
															</Button>
															<Button
																ripple="light"
																className="ml-4 text-white text-sm font-bold rounded p-2 border  bg-red-500 hover:bg-red-700 cursor-pointer "
																onClick={() => DeleteEmployee.mutate(val.id)}
															>
																<TrashIcon className="h-5 w-5 " />
															</Button>
														</div>
													</td>
												</tr>
											))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
