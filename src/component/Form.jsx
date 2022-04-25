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
			<div className="w-full max-w-6xl mt-5 flex justify-center items-center mt-15">
				<form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg 	">
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						for="grid-first-name"
					>
						Name
					</label>
					<Controller
						render={({ field }) => (
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
								id="grid-first-name"
								{...field}
							/>
						)}
						name="username"
						control={control}
						defaultValue=""
					/>
					<p className="text-red-500 text-xs italic">
						{errors.username?.message}
					</p>
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						for="grid-first-name"
					>
						Email
					</label>
					<Controller
						render={({ field }) => (
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
								id="grid-first-name"
								{...field}
							/>
						)}
						name="email"
						control={control}
						defaultValue=""
					/>{" "}
					<p className="text-red-500 text-xs italic">{errors.email?.message}</p>
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						for="grid-first-name"
					>
						Phone Number
					</label>
					<Controller
						render={({ field }) => (
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
								{...field}
							/>
						)}
						name="phonenumber"
						control={control}
						defaultValue=""
					/>{" "}
					<p className="text-red-500 text-xs italic">
						{errors.phonenumber?.message}
					</p>
					<div class="flex flex-wrap -mx-3 mb-6">
						<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								for="grid-first-name"
							>
								Department
							</label>
							<Controller
								render={({ field }) => (
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
										{...field}
									/>
								)}
								name="department"
								control={control}
								defaultValue=""
							/>{" "}
							<p className="text-red-500 text-xs italic">
								{errors.department?.message}
							</p>
						</div>
						<div class="w-full md:w-1/2 px-3">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								for="grid-first-name"
							>
								Age
							</label>
							<Controller
								render={({ field }) => (
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
										{...field}
									/>
								)}
								name="age"
								control={control}
								defaultValue=""
							/>{" "}
							<p className="text-red-500 text-xs italic">
								{errors.age?.message}
							</p>
						</div>{" "}
					</div>
					<div className="mt-5 flex justify-center ">
						<button
							type="submit"
							className="bg-blue-500 hover:bg-blue-700 text-white font-semibold hover:text-white py-1 px-3 border  hover:border-transparent rounded"
						>
							SUBMIT
						</button>
						<button
							className="bg-red-500 hover:bg-red-700 text-white font-semibold hover:text-white py-1 ml-5 px-3 border  hover:border-transparent rounded"
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
