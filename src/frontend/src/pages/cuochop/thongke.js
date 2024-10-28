import { useState } from "react";
import { useNavigate } from "react-router";
import { ThongSoCuocHop } from "../../components/thongSoCuocHop";

function ThongKeCuocHop() {
    const navigate = useNavigate();
    const [numberMonthAgo, setNumberMonthAgo] = useState(0);
    return (<div class="d-flex flex-fill flex-column">
        <div class="d-flex mb-2">
            <div class="input-group mr-2">

                <input type="number" class="border-0 rounded-left" id="month_input" />
                <div class="input-group-prepend mr-2">
                    <span class="input-group-text" id="basic-addon1">month ago</span>
                </div>
                <button class="btn btn-success" onClick={() => {
                    setNumberMonthAgo(document.getElementById("month_input").value)
                }}>Thống kê </button>
            </div>

            <button class="btn btn-danger" onClick={() => navigate("../")}>Quay lại</button>
        </div>

        <ThongSoCuocHop numberMonthAgo={numberMonthAgo}></ThongSoCuocHop>


        {/* <ThongSoCuocHop ></ThongSoCuocHop> */}


    </div>);
}

export default ThongKeCuocHop;