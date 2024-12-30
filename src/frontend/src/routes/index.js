import CuocHop from "../pages/cuochop";
import HoKhau from "../pages/hokhau";
import NhanKhau from "../pages/nhankhau";
import TamTru from "../pages/tamtru";
import TamVang from "../pages/tamvang";
import TrangChu from "../pages/trangchu";
import ThemHoKhau from "../pages/hokhau/them";
import ThemTamTru from "../pages/tamtru/them";
import ThemTamVang from "../pages/tamvang/them";
import InfoHoKhau from "../pages/hokhau/info";
import InfoNhanKhau from "../pages/nhankhau/info";
import ThemCuocHop from "../pages/cuochop/them";
import InfoCuocHop from "../pages/cuochop/info";
import InfoTamTru from "../pages/tamtru/info";
import InfoTamVang from "../pages/tamvang/info";
import ThongKeCuocHop from "../pages/cuochop/thongke";

const publicRoutes = [
    { path: "", element: <TrangChu />, name: "Trang chủ", icon: "fa fa-bar-chart" },
    {
        path: "hokhau", name: "Hộ khẩu",
        children: [
            { path: "", element: <HoKhau />, name: "Danh sách hộ khẩu" },
            { path: "them", element: <ThemHoKhau />, name: "Thêm hộ khẩu" },
            { path: ":id", element: <InfoHoKhau />, name: "Chi tiết hộ khẩu" }
        ],
        icon: "fa fa-home"
    },
    {
        path: "nhankhau", name: "Nhân khẩu",
        children: [
            { path: "", element: <NhanKhau />, name: "Danh sách nhân khẩu" },
            { path: ":id", element: <InfoNhanKhau />, name: "Chi tiết nhân khẩu" }
        ],
        icon: "fa fa-users"
    },
    {
        path: "tamtru", name: "Tạm trú",
        children: [
            { path: "", element: <TamTru />, name: "Danh sách tạm trú" },
            { path: "them", element: <ThemTamTru />, name: "Thêm tạm trú" },
            { path: ":id", element: <InfoTamTru />, name: "Chi tiết cuoc hop" }
        ],
        icon: "fa fa-user-plus"
    },
    {
        path: "tamvang", name: "Tạm vắng",
        children: [
            { path: "", element: <TamVang />, name: "Danh sách tạm vắng", },
            { path: "them", element: <ThemTamVang />, name: "Thêm tạm vắng" },
            { path: ":id", element: <InfoTamVang />, name: "Chi tiết cuoc hop" }
        ],
        icon: "fa fa-user-times"
    },
    {
        path: "cuochop", name: "Cuộc họp",
        children: [
            { path: "", element: <CuocHop />, name: "Danh sách cuoc hop", },
            { path: "them", element: <ThemCuocHop />, name: "Thêm cuoc hop" },
            { path: "thongke", element: <ThongKeCuocHop />, name: "Thong ke cuoc hop" },
            { path: ":id", element: <InfoCuocHop />, name: "Chi tiết cuoc hop" }
        ],
        icon: "fa fa-weixin"
    }
]

export default publicRoutes;