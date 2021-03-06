import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@material-tailwind/react/Button";
import axios from "axios";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
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
		phonenumber: yup
			.number()
			.max(9999999999, "Please enter valid phonenumber")
			.required(),
		department_id: yup.number().required(),
	})
	.required();
function Form({ onSubmit, dataemp }) {
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

	const getDept = () => {
		const getApi = "http://localhost:8080/department";
		return axios.get(getApi);
	};
	const { data, isLoading, error } = useQuery("dept", getDept, {
		enabled: true,
	});
	useEffect(() => {
		if (dataemp) {
			setValue("username", dataemp?.username);
			setValue("email", dataemp?.email);
			setValue("department_id", dataemp?.department_id);
			setValue("phonenumber", dataemp?.phonenumber);
			setValue("age", dataemp?.age);
		}
	}, [dataemp, setValue]);

	const { t } = useTranslation();
	if (isLoading) return <h1>Loading...</h1>;
	if (error) return <h1>Error...</h1>;
	console.log(data?.data);
	const create = t("Create Employee");
	const update = t("Update Employee");
	return (
		<>
			<h1 className="flex justify-center items-center  text-2xl font-extrabold text-blue-900 absolute left-10 mt-10 underline">
				{id ? update : create}
			</h1>{" "}
			<div className="w-full max-w-6xl mt-12 py-10 flex justify-center items-center mt-15">
				<form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg 	">
					<label
						className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
						htmlFor="grid-first-name"
					>
						{t("Name")}
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
						htmlFor="grid-first-name"
					>
						{t("Email")}
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
						htmlFor="grid-first-name"
					>
						{t("Phone Number")}
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
					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="grid-first-name"
							>
								{t("Department")}
							</label>

							<Controller
								name="department_id"
								control={control}
								render={({ field }) => (
									<select
										className="form-select form-select-lg appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
										aria-label=".form-select-lg example"
										{...field}
									>
										{data?.data?.map((val) => (
											<option key={val.id} value={val.id}>
												{val.department}
											</option>
										))}
									</select>
								)}
							/>
							<p className="text-red-500 text-xs italic">
								{errors.department_id?.message}
							</p>
						</div>
						<div className="w-full md:w-1/2 px-3">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="grid-first-name"
							>
								{t("Age")}
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
						<Button
							ripple="light"
							type="submit"
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold hover:text-white py-1 px-3 border  hover:border-transparent rounded"
						>
							{t("Submit")}
						</Button>
						<Button
							ripple="light"
							className="bg-red-500 hover:bg-red-700 text-white font-bold hover:text-white py-1 ml-5 px-3 border  hover:border-transparent rounded"
							onClick={() => nav("/")}
						>
							{t("Cancel")}
						</Button>
					</div>
				</form>
			</div>
		</>
	);
}

export default Form;
