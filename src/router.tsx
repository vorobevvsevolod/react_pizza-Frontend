import {Route, Routes} from "react-router-dom";

import React from "react";
import Home from "./componets/Pages/Home";
import CabinetPage from "./componets/Pages/CabinetPage";
import OrderPage from "./componets/Pages/Order";

const Router = () => {
	return (
		<Routes>
            <Route path='/home' element={<Home/>}/>
			<Route path="/cabinet" element={<CabinetPage/>}/>
			<Route path="/order" element={<OrderPage/>}/>
            <Route path='*' element={<Home/>}/>
		</Routes>
	);
};

export default Router;
