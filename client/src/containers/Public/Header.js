import React, { useCallback, useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import { Button, User } from "../../components";
import icons from "../../ultils/icons";
import {
  useNavigate,
  Link,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { path } from "../../ultils/constant";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import menuManage from "../../ultils/menuManage";

const { AiOutlinePlusCircle, AiOutlineLogout, BsChevronDown } = icons;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const headerRef = useRef();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { currentData } = useSelector((state) => state.user);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);

  // console.log(currentData)
  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [searchParams.get("page"), location.pathname]);

  return (
    <div ref={headerRef} className="w-3/5 ">
      <div className="w-full   flex items-center justify-between">
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo"
            className="w-[300px] h-[80px] object-contain"
          />
        </Link>
        <div className="flex items-center gap-1">
          {!isLoggedIn && (
            <div className="flex items-center gap-1 ">
              <small className="font-bold ">Matbang24h xin chào !</small>
              <Button
                text={"Đăng nhập"}
                textColor="text-white"
                bgColor="bg-slate-900"
                onClick={() => goLogin(false)}
              />
              <Button
                text={"Đăng ký"}
                bgColor="bg-yellow-400"
                textColor = 'black'
                onClick={() => goLogin(true)}
              />
            </div>
          )}
          {isLoggedIn && (
            <div className="flex items-center gap-3 relative">
              <User />
              <Button
                text={"Quản lý tài khoản"}
                textColor="text-white"
                bgColor="bg-slate-800"
                px="px-4"
                IcAfter={BsChevronDown}
                onClick={() => setIsShowMenu((prev) => !prev)}
              />
              {isShowMenu && (
                <div className="absolute min-w-200 top-full bg-white shadow-md rounded-md p-4 right-0 flex flex-col">
                  {currentData?.role !== "ADMIN" &&
                    menuManage.map((item) => {
                      return (
                        <Link
                          className="hover:text-orange-500 flex items-center gap-2 text-blue-600 border-b border-gray-200 py-2"
                          key={item.id}
                          to={item?.path}
                        >
                          {item.text}
                        </Link>
                      );
                    })}
                  {currentData?.role === "ADMIN" && (
                    <Link
                      className="hover:text-yellow-500 flex items-center gap-2 text-slate-600 border-b border-gray-200 py-2"
                      to={`/${path.ADMIN}/${path.MANAGE_POST}`}
                    >
                      Admin
                    </Link>
                  )}
                  <span
                    className="cursor-pointer hover:text-yellow-500 text-slate-500 py-2 flex items-center gap-2"
                    onClick={() => {
                      setIsShowMenu(false);
                      dispatch(actions.logout());
                    }}
                  >
                    Đăng xuất
                  </span>
                </div>
              )}
            </div>
          )}
          {isLoggedIn && (
            <Button
              text={"Đăng tin mới"}
              textColor="text-white"
              bgColor="bg-secondary2"
              IcAfter={AiOutlinePlusCircle}
              onClick={() => navigate("/he-thong/tao-moi-bai-dang")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
