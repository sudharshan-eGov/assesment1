import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
const schema = yup
	.object({
		username: yup
			.string()
			.matches(/^[A-Za-z ]*$/, "Please enter valid name")
			.required(),
		age: yup
			.number()
			.positive()
			.integer()
			.max(60, "Age must be less than or equal to 60")
			.required(),
		email: yup.string().email().required(),
		department: yup
			.string()
			.matches(/^[A-Za-z ]*$/, "Please enter valid name")
			.required(),
		phonenumber: yup
			.number()
			.max(9999999999, "Please enter valid phonenumber")
			.matches(new RegExp("[0-9]{10}"), "Please enter valid Mobile Nmber")
			.required(),
	})
	.required();
function Form({ onSubmit, data }) {
	const { id } = useParams();
	const nav = useNavigate();
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	useEffect(() => {
		if (data) {
			setValue("username", data?.username);
			setValue("email", data?.email);
			setValue("department", data?.department);
			setValue("phonenumber", data?.phonenumber);
			setValue("age", data?.age);
		}
	}, [data]);

	return (
		<>
			<h1 className="flex justify-center items-center  text-4xl font-extrabold text-blue-500">
				{id ? "Update Employee" : "Create Employee"}
			</h1>
			<div className="w-full max-w-6xl flex justify-center items-center mt-15">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="bg-white shadow-md rounded px-32 py-10 mb-4"
				>
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Name
					</label>
					<Controller
						render={({ field }) => (
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								{...field}
							/>
						)}
						name="username"
						control={control}
						defaultValue=""
					/>
					<p className="text-red-500 italic">{errors.username?.message}</p>
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Email
					</label>
					<Controller
						render={({ field }) => (
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								{...field}
							/>
						)}
						name="email"
						control={control}
						defaultValue=""
					/>{" "}
					<p className="text-red-500 italic">{errors.email?.message}</p>
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Department
					</label>
					<Controller
						render={({ field }) => (
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								{...field}
							/>
						)}
						name="department"
						control={control}
						defaultValue=""
					/>{" "}
					<p className="text-red-500 italic">{errors.department?.message}</p>
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Phone Number
					</label>
					<Controller
						render={({ field }) => (
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								{...field}
							/>
						)}
						name="phonenumber"
						control={control}
						defaultValue=""
					/>{" "}
					<p className="text-red-500 italic">{errors.phonenumber?.message}</p>
					<label className="block text-gray-700 text-sm font-bold mb-2">
						Age
					</label>
					<Controller
						render={({ field }) => (
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								{...field}
							/>
						)}
						name="age"
						control={control}
						defaultValue=""
					/>{" "}
					<p className="text-red-500 italic">{errors.age?.message}</p>
					<div className="mt-5 flex justify-center ">
						<button
							type="submit"
							className="bg-blue-500 hover:bg-blue-400 text-white font-semibold hover:text-white py-2 px-4 ml-10 border  hover:border-transparent rounded"
						>
							SUBMIT
						</button>
						<button
							className="bg-red-500 hover:bg-red-400 text-white font-semibold hover:text-white py-2 ml-5 px-4 border  hover:border-transparent rounded"
							onClick={() => nav("/")}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default Form;
