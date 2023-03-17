import {Route, Routes} from "react-router-dom";

import React from "react";
import Home from "./componets/Pages/Home";
import CabinetPage from "./componets/Pages/CabinetPage";

const Router = () => {
	return (
		<Routes>
			<Route exact path="/" element={<Home/>}/>
			<Route exact path="/cabinet" element={<CabinetPage/>}/>
		</Routes>
	);
};

export default Router;
