import { Route, Routes } from "react-router-dom";
import "./App.css";
import Create from "./component/Create";
import Navbar from "./component/Navbar";
import Update from "./component/Update";
function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Navbar />} />
				<Route path="/create" element={<Create />} />
				<Route path="/update/:id" element={<Update />} />
			</Routes>
		</div>
	);
}

export default App;
