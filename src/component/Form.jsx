import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import * as yup from "yup";
// import "./Form.css";
const schema = yup
	.object({
		username: yup.string().required(),
		age: yup.number().positive().integer().required(),
		email: yup.string().email().required(),
		department: yup.string().required(),
		phoneNumber: yup.number().required(),
		gender: yup.string().required(),
	})
	.required();
function Form() {
	const queryClient = useQueryClient();
	const nav = useNavigate();
	// const url = "https://sudharshan";
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	// const details = axios.post(url);
	// const [data] = useMutation("details", details, {
	// 	onSuccess: () => {
	// 		// Invalidate and refetch
	// 		queryClient.invalidateQueries("employees");
	// 	},
	// });
	const onSubmit = (data) => {
		console.log(JSON.stringify(data));
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>Name</label>
				<Controller
					render={({ field }) => <input {...field} />}
					name="username"
					control={control}
					defaultValue=""
				/>
				<p>{errors.username?.message}</p>
				<label>Email</label>
				<Controller
					render={({ field }) => <input {...field} />}
					name="email"
					control={control}
					defaultValue=""
				/>{" "}
				<p>{errors.email?.message}</p>
				<label>Department</label>
				<Controller
					render={({ field }) => <input {...field} />}
					name="department"
					control={control}
					defaultValue=""
				/>{" "}
				<p>{errors.department?.message}</p>
				<label>Age</label>
				<Controller
					render={({ field }) => <input {...field} />}
					name="age"
					control={control}
					defaultValue=""
				/>{" "}
				<p>{errors.age?.message}</p>
				<label>Gender</label>
				<Controller
					name="gender"
					render={({ field }) => (
						<Select
							{...field}
							options={[
								{ value: "Male", label: "Male" },
								{ value: "Female", label: "Female" },
							]}
						/>
					)}
					control={control}
					defaultValue=""
				/>{" "}
				<p>{errors.gender?.message}</p>
				<label>Phone Number</label>
				<Controller
					render={({ field }) => <input {...field} />}
					name="phoneNumber"
					control={control}
					defaultValue=""
				/>{" "}
				<p>{errors.phoneNumber?.message}</p>
				<div
					style={{
						display: "flex",
						flex: "row",
						justifyContent: "space-between",
					}}
				>
					<button type="submit">SUBMIT</button>
					<button style={{ backgroundColor: "red" }} onClick={() => nav("/")}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}

export default Form;
