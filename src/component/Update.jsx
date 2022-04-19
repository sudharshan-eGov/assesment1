import axios from "axios";
import { lazy, Suspense } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
	const UpdateForm = lazy(() => import("./Form"));
	const { id } = useParams();
	const nav = useNavigate();
	const queryClient = useQueryClient();

	const getEmployee = (id) => axios.get(`http://localhost:8080/employee/${id}`);
	const { data, error, isLoading } = useQuery("employee", () =>
		getEmployee(id)
	);
	const updateUser = (employee) => {
		const postApi = `http://localhost:8080/update_employee/${id}`;
		return axios.put(postApi, employee);
	};
	const updateEmployee = useMutation(updateUser, {
		onSuccess: () => {
			queryClient.invalidateQueries("allemployees");
		},
		onSettled: () => {
			queryClient.invalidateQueries("allemployees");
		},
	});

	const onSubmit = async (data) => {
		await updateEmployee.mutate({ id, ...data });
		nav("/");
	};
	if (isLoading) <h1>Loading...</h1>;
	if (error) <h1>Error!</h1>;
	return (
		<Suspense fallback={<h1>isLoading...</h1>}>
			<UpdateForm onSubmit={onSubmit} data={{ ...data?.data }} />
		</Suspense>
	);
}

export default Update;
