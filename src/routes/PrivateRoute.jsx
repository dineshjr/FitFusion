import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from 'react-router-dom'
import AuthenticatePage from '../pages/AuthenticatedPage'

const Dashboard = () => <h1>Dashboard (Private)</h1>;
const Settings = () => <h1>Settings (Private)</h1>;

const RequireAuth = ({ children }) => {
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
	return isAuthenticated ? children : <Navigate to="/signin" replace />;
}

export default function getPrivateRoutes() {
	return (
		<React.Fragment>
			<Route
				path="/dashboard"
				element={
					<RequireAuth>
						<AuthenticatePage />
					</RequireAuth>
				}
			/>
			<Route
				path="/settings"
				element={
					<RequireAuth>
						<Settings />
					</RequireAuth>
				}
			/>
		</React.Fragment>
	)
}
