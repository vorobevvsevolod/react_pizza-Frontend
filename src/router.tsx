import {Route, Routes} from "react-router-dom";

import React from "react";
import Home from "./componets/Pages/Home";
import CabinetPage from "./componets/Pages/CabinetPage";
import OrderPage from "./componets/Pages/Order";
import OrderView from "./componets/Pages/OrderView";
import OrdersSearch from "./componets/Pages/OrdersSearch";
import Contact from "./componets/Pages/Contact";

const Router = () => {
	return (
		<Routes>
            <Route path='/home' element={<Home/>}/>
			<Route path="/cabinet" element={<CabinetPage/>}/>
			<Route path="/order" element={<OrderPage/>}/>
            <Route path="/order/:id" element={<OrderView/>}/>
            <Route path="/ordersSearch" element={<OrdersSearch/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path='*' element={<Home/>}/>
		</Routes>
	);
};

export default Router;
