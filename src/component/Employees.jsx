import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useState } from "react";
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
												Sl No.
											</th>
											<th
												scope="col"
												className="text-sm font-extrabold text-gray-900 px-6 py-4 text-left  border-r-2"
											>
												<div className="ml-2 flex-row justify-around">
													<div>Name</div>
													<button
														onClick={() => setSort(true)}
														className=" bg-blue-400 hover:bg-blue-700 text-white  px-1 rounded-md text-bold font-sm "
													>
														ASC &#8593;
													</button>
													<button
														onClick={() => setSort(false)}
														className=" bg-blue-400 hover:bg-blue-700 text-white  px-1 rounded-md text-bold font-sm ml-2 md:768"
													>
														DESC &#8595;
													</button>
												</div>
											</th>
											<th
												scope="col"
												className="text-sm font-extrabold text-gray-900 px-6 py-4 text-left border-r-2"
											>
												Email
											</th>
											<th
												scope="col"
												className="text-sm font-extrabold text-gray-900 px-6 py-4 text-left border-r-2"
											>
												Department
											</th>
											<th
												scope="col"
												className="text-sm font-extrabold text-gray-900 px-6 py-4 text-left border-r-2"
											>
												Mobile
											</th>
											<th
												scope="col"
												className="text-sm font-extrabold text-gray-900 px-6 py-4 text-left border-r-2"
											>
												Age
											</th>
											<th
												scope="col"
												className="text-sm font-extrabold text-gray-900 px-6 py-4 text-left border-r-2"
											>
												Actions
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
													val.age.toString().includes(search.toString()) ||
													val.department
														.toLowerCase()
														.includes(search.toLowerCase())
												) {
													return val;
												}
											})
											.sort(sort ? asc : desc)

											.map((val, index) => (
												<tr className="border-b" key={index}>
													<td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-gray-900 border-r-2 ">
														{index + 1}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r-2">
														{val.username}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r-2">
														{val.email}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r-2">
														{val.department}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r-2">
														{val.phonenumber}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r-2">
														{val.age}
													</td>

													<td className="text-lg text-gray-900 font-light px-4 py-4 whitespace-nowrap border-r-2">
														<div className="flex">
															<button
																className="text-sm font-bold rounded p-2 border text-white bg-gray-400 hover:bg-gray-700 cursor-pointer "
																onClick={() => nav(`/update/${val.id}`)}
															>
																{" "}
																<PencilAltIcon className="h-5 w-5 " />
															</button>
															<button
																className="ml-4 text-white text-sm font-bold rounded p-2 border  bg-red-500 hover:bg-red-700 cursor-pointer "
																onClick={() => DeleteEmployee.mutate(val.id)}
															>
																<TrashIcon className="h-5 w-5 " />
															</button>
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
