import { Routes, Route } from 'react-router-dom'
import { Home, Login, Rental, Homepage, DetailPost, SearchDetail, Contact, ResetPassword } from './containers/Public'
import { path } from './ultils/constant'
import { System, CreatePost, ManagePost, EditAccount } from './containers/System'
import { Admin, Dashboard, ManagePostAdmin, ManageUser } from './containers/Admin'
import * as actions from './store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.auth)
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent())
    }, 1000)
  }, [isLoggedIn])

  useEffect(() => {
    dispatch(actions.getPrices())
    dispatch(actions.getAreas())
    dispatch(actions.getProvinces())
  }, [])

  return (
    <div className="bg-primary overflow-hidden">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path='*' element={<Homepage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
          <Route path={path.NHA_CHO_THUE} element={<Rental />} />
          <Route path={path.SEARCH} element={<SearchDetail />} />
          <Route path={path.DETAL_POST__TITLE__POSTID} element={<DetailPost />} />
          <Route path={path.CONTACT} element={<Contact />} />
          {/* <Route path={path.DETAIL_ALL} element={<DetailPost />} /> */}
        </Route>
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={path.SYSTEM} element={<System />} >
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.EDIT_ACCOUNT} element={<EditAccount />} />
        </Route>

        <Route path={path.ADMIN} element={<Admin />} >
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.EDIT_ACCOUNT} element={<EditAccount />} />
          <Route path={path.MANAGE_POST} element={<ManagePostAdmin />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="color"
      />
    </div>
  );
}

export default App;
