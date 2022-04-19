import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
export default function Employees() {
	const client = useQueryClient();
	const nav = useNavigate();
	const url = "http://localhost:8080/employees";
	const employees = axios.get(url);
	const { data, isLoading, error } = useQuery("allemployees", () => employees);

	const urlDelete = (id) =>
		axios.delete(`http://localhost:8080/employee/${id}`);
	const DeleteEmployee = useMutation(urlDelete, {
		onSuccess: () => {
			client.invalidateQueries("allemployees");
		},
	});

	if (isLoading) <h1>Loading...</h1>;
	if (error) <h1>Error...</h1>;
	// console.log(data?.data, "data");
	return (
		<div>
			<h2 className="text-blue-500 font-bold text-2xl flex justify-center underline">
				Employees List
			</h2>
			<div className="flex flex-col">
				<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
						<div className="overflow-hidden">
							<table className="min-w-full">
								<thead className="border-b">
									<tr>
										<th
											scope="col"
											className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
										>
											Sl No.
										</th>
										<th
											scope="col"
											className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
										>
											Name
										</th>
										<th
											scope="col"
											className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
										>
											Email
										</th>
										<th
											scope="col"
											className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
										>
											Department
										</th>
										<th
											scope="col"
											className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
										>
											Mobile
										</th>
										<th
											scope="col"
											className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
										>
											Age
										</th>
										<th
											scope="col"
											className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
										>
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{data?.data
										?.map((val, index) => ({
											...val,
											tableId: index + 1,
										}))
										.map((val, index) => (
											<tr className="border-b" key={index}>
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
													{val.tableId}
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													{val.username}
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													{val.email}
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													{val.department}
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													{val.phonenumber}
												</td>
												<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													{val.age}
												</td>

												<td className="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
													<div className="flex">
														<button
															className="text-xl cursor-pointer"
															onClick={() => nav(`/update/${val.id}`)}
														>
															Edit
														</button>
														<button
															className="ml-4 text-xl text-red-500 cursor-pointer"
															onClick={() => DeleteEmployee.mutate(val.id)}
														>
															Delete
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
		</div>
	);
}
