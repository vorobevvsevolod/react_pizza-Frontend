import {Route, Routes} from "react-router-dom";

import React from "react";
import Home from "./componets/Pages/Home";
import CabinetPage from "./componets/Pages/CabinetPage";

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Home/>}/>
			<Route path="/cabinet" element={<CabinetPage/>}/>
            <Route path='*' element={<Home/>}/>
		</Routes>
	);
};

export default Router;
