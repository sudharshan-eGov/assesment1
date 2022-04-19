import axios from "axios";
import { lazy, Suspense } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
const CreateForm = lazy(() => import("./Form"));

function Create() {
	const nav = useNavigate();
	const queryClient = useQueryClient();
	const creteUser = (users) => {
		const postApi = "http://localhost:8080/create_employee";
		return axios.post(postApi, users);
	};
	const postUser = useMutation(creteUser, {
		onSuccess: () => {
			queryClient.invalidateQueries("allemployees");
		},
		onSettled: () => {
			queryClient.invalidateQueries("allemployees");
		},
	});
	const onSubmit = async (data) => {
		await postUser.mutate({ ...data });
		nav("/");
	};
	return (
		<Suspense fallback={<h1>Loading..</h1>}>
			<CreateForm onSubmit={onSubmit} />;
		</Suspense>
	);
}

export default Create;
