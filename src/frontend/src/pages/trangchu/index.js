import { useEffect, useState } from "react";
import { fetchAPI } from "../../untils/fetchAPI";
import TimeAgo from "javascript-time-ago";
import vi from "javascript-time-ago/locale/vi.json";
import { ThongSoCuocHop } from "../../components/thongSoCuocHop";
function TrangChu() {
    const [actions, setActions] = useState([]);
    const [generalInfo, setGeneralInfo] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {
                    result: { content: actions }
                } = await fetchAPI("/api/v1/hoatdong", {
                    //token: session.token,
                    params: { page: 0, size: 15, sort: "id,desc", keyword: "" },
                });

                const {
                    result: generalInfo
                } = await fetchAPI("/api/v1/thongso", {
                    //token: session.token,
                    //params: { page: 0, size: 5, sort: "id,desc", keyword: "" },
                });
                setActions(actions);
                setGeneralInfo(generalInfo);
                console.log(actions);

            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])
    return (<div class="mt-3 flex-fill d-flex flex-column">
        <div class="d-flex">
            <div class="flex-fill bg-white rounded-3 mr-2 p-2">
                <div class="h5 d-flex justify-content-center">Số lượng hộ khẩu</div>
                <div class="h4 d-flex justify-content-center text-primary">{generalInfo.soHoKhau}</div>
            </div>
            <div class="flex-fill bg-white rounded-3 mr-2 p-2">
                <div class="h5 d-flex justify-content-center">Số lượng nhân khẩu</div>
                <div class="h4 d-flex justify-content-center text-success">{generalInfo.soNhanKhau}</div>
            </div>
            <div class="flex-fill bg-white rounded-3 mr-2 p-2">
                <div class="h5 d-flex justify-content-center">Số lượng tạm trú</div>
                <div class="h4 d-flex justify-content-center text-danger">{generalInfo.soTamTru}</div>
            </div>
            <div class="flex-fill bg-white rounded-3 p-2">
                <div class="h5 d-flex justify-content-center">Số lượng tạm vắng</div>
                <div class="h4 d-flex justify-content-center text-warning">{generalInfo.soTamVang}</div>
            </div>
        </div>
        <div class="d-flex flex-fill mt-2">
            <div class="flex-fill mr-2 d-flex">
                <ThongSoCuocHop numberMonthAgo={12}></ThongSoCuocHop>
            </div>
            <div class="col-3 bg-white rounded-3 p-2">
                <div class="h5">Danh sách hoạt động</div>
                <hr></hr>
                <div className="action-list">
                {
                    actions.map((e, index) => (
                    <div className="d-flex align-items-center my-2" key={index}>
                        <div className="mr-2 h6">{formatDateTime(e.time)}</div>
                        <div>{e.mess}</div>
                    </div>
                    ))
                }
                </div>
            </div>
        </div>
    </div>);
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export default TrangChu;