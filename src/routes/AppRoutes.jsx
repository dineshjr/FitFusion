import LandingPage from '../pages/LandingPage'
import SignIn from '../pages/SignIn'
import SignUpPage from '../Components/auth/SignUpPage'
import ForgotPassword from '../pages/ForgotPassword'
import CreatePassword from '../Components/auth/CreatePassword'
import { Routes, Route } from 'react-router-dom'
import getPrivateRoutes from './PrivateRoute'

const AppRoutes = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path='/forgotpassword' element={<ForgotPassword />} />
				<Route path='/createpassword/:resetId/:emailid' element={<CreatePassword />} />
				{getPrivateRoutes()}
			</Routes>
		</>
	)
}

export default AppRoutes
