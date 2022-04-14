import { Route, Routes } from "react-router-dom";
import "./App.css";
import Details from "./component/Details";
import Form from "./component/Form.jsx";
function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Details />} />
				<Route path="/create" element={<Form />} />
			</Routes>
		</div>
	);
}

export default App;
