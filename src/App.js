import { Route, Routes } from "react-router-dom";
import "./App.css";
import Create from "./component/Create";
import Header from "./component/Header";
import NavBar from "./component/NavBar";
import Update from "./component/Update";
function App() {
	return (
		<div>
			<NavBar />
			<Routes>
				<Route path="/" element={<Header />} />
				<Route path="/create" element={<Create />} />
				<Route path="/update/:id" element={<Update />} />
			</Routes>
		</div>
	);
}

export default App;
