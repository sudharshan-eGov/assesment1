import { Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./component/Form.jsx";
import Navbar from "./component/Navbar";
import Update from "./component/Update";
function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Navbar />} />
				<Route path="/create" element={<Form />} />
				<Route path="/update/:id" element={<Update />} />
			</Routes>
		</div>
	);
}

export default App;
