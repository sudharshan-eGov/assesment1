import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
// import "./Form.css";
const schema = yup
	.object({
		username: yup.string().required(),
		age: yup.number().positive().integer().required(),
		email: yup.string().email().required(),
		department: yup.string().required(),
		phonenumber: yup.string().required(),
	})
	.required();
function Form() {
	const queryClient = useQueryClient();
	const nav = useNavigate();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const creteUser = (users) => {
		const postApi = "http://localhost:8080/employees";
		return axios.post(postApi, users);
	};
	const postUser = useMutation(creteUser, {
		onSuccess: () => {
			queryClient.invalidateQueries("employees");
		},
	});
	const onSubmit = async (data) => {
		await postUser.mutate({ ...data });
		console.log(data);
		nav("/");
	};
	return (
		<div className="w-full max-w-6xl flex justify-center items-center mt-20">
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
				<p>{errors.username?.message}</p>
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
				<p>{errors.email?.message}</p>
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
				<p>{errors.department?.message}</p>
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
				<p>{errors.phonenumber?.message}</p>
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
				<p>{errors.age?.message}</p>
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
	);
}

export default Form;
