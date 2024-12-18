import { useCallback, useEffect, useState } from "react";
import { fetchAPI } from "../../untils/fetchAPI";
import { Bar, Pie } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);


export function ThongSoCuocHop({ numberMonthAgo }) {

    const [years, setYears] = useState([]);
    const [months, setMonths] = useState([]);
    const [thongSoCuocHop, setThongSoCuocHop] = useState([]);
    const [thongSoChung, setThongSoChung] = useState({});
    const [hoKhauThamGias, setHoKhauThamGias] = useState([]);
    const [datasets, setDatasets] = useState([]);
    //
    const fetchThongSoCuocHop = useCallback(async (year, month) => {
        if (month < 10) month = `0${month}`
        try {

            const {
                result: thongso
            } = await fetchAPI(`/api/v1/cuochop/thongkecuochop`, {
                //token: session.token,
                params: { months: month, years: year },
            });
            //console.log(thongso);
            return {
                ...thongso,
                cuocHops: thongso.cuocHops.length
            }

        } catch (err) {
            console.log(err)
        }
    }, [numberMonthAgo])

    const fetchHoKhauThamGias = useCallback(async (year, month) => {
        if (month < 10) month = `0${month}`
        try {

            const {
                result: thongso
            } = await fetchAPI(`/api/v1/cuochop/thongkenguoithamgia`, {
                //token: session.token,
                params: { months: month, years: year },
            });

            return thongso;

        } catch (err) {
            console.log(err)
        }
    }, [numberMonthAgo])

    useEffect(() => {
        const fetchData = async () => {
            const time = Date.now();
            const date = new Date(time);
            var year = date.getFullYear();
            var month = date.getMonth()
            var years = []
            var months = []
            var thongSoCuocHop = []

            for (var i = 0; i < numberMonthAgo; i++) {
                years = [year, ...years]
                months = [month, ...months]
                thongSoCuocHop = [await fetchThongSoCuocHop(year, month + 1), ...thongSoCuocHop]
                if (month == 0) year--;
                month = (month + 11) % 12

            }
            setThongSoChung({ ...thongSoCuocHop[0] });

            for (var i = 0; i < numberMonthAgo - 1; i++) {

                thongSoCuocHop[i].thamGia -= thongSoCuocHop[i + 1].thamGia;
                thongSoCuocHop[i].vangCoLyDo -= thongSoCuocHop[i + 1].vangCoLyDo;
                thongSoCuocHop[i].vangKhongLyDo -= thongSoCuocHop[i + 1].vangKhongLyDo;
                thongSoCuocHop[i].cuocHops -= thongSoCuocHop[i + 1].cuocHops;
            }

            setYears(years);
            setMonths(months);
            setThongSoCuocHop(thongSoCuocHop);
            setHoKhauThamGias(await fetchHoKhauThamGias(year, month + 1));
            console.log(year, month)
            console.log(hoKhauThamGias);
        }
        if (numberMonthAgo) fetchData()

    }, [numberMonthAgo])
    
    return (<div class="flex-fill d-flex">
        <div class="bg-white rounded flex-fill p-2 mr-2">
            <div class="d-flex justify-content-center h5 my-4">Thông số cuộc họp {numberMonthAgo} tháng qua</div>


            <Bar 
                data={{
                    labels: months.map((e, i) => e + 1 + "/" + years[i]),
                    datasets: [
                        {
                            label: 'Tham gia',
                            data: thongSoCuocHop.map(e => Number(e.thamGia)),
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                        {
                            label: 'Vắng có lý do',
                            data: thongSoCuocHop.map(e => Number(e.vangCoLyDo)),
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                        {
                            label: 'Vắng không lý do',
                            data: thongSoCuocHop.map(e => Number(e.vangKhongLyDo)),
                            backgroundColor: 'rgba(247, 122, 4, 0.5)',
                        },
                        {
                            label: 'Cuộc họp',
                            data: thongSoCuocHop.map(e => Number(e.cuocHops)),
                            backgroundColor: 'rgba(132, 237, 158, 0.5)',
                        }
                    ],

                }} 
                options={{
                    responsive: true,
                    scales: {
                      y: {
                        ticks: {
                          callback: (value) => Math.floor(value), // Hiển thị số nguyên
                          stepSize: 1, // Tăng giá trị theo từng đơn vị
                        },
                      },
                    },
                }}
            />

            <div class="d-flex justify-content-center h5 my-4"> Tổng số cuộc họp: {thongSoChung.cuocHops}</div>

        </div>
        <div class="d-flex flex-column">
            <div class="bg-white rounded mb-2 py-3">
                <div class="d-flex justify-content-center h5 mb-4">Thông số điểm danh</div>
                <Pie data={{
                    labels: ["Tham gia", "Vắng có lý do", "Vắng không lý do"],
                    datasets: [
                        {
                            label: 'so luong',
                            data: [thongSoChung.thamGia, thongSoChung.vangCoLyDo, thongSoChung.vangKhongLyDo],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',

                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',

                            ],
                            borderWidth: 1,
                        },
                    ],
                }}></Pie>
            </div>
            <div class="flex-fill bg-white rounded p-2">
                <div class="h5">Những người tham gia tích cực</div>
                <hr></hr>
                {
                    hoKhauThamGias.filter(e => e.vangCoLyDo + e.vangKhongLyDo === 0)
                        .sort((a, b) => a.thamGia > b.thamGia)
                        .map(e => <div>{e.hoTenChuHo}</div>)
                }
            </div>
        </div>
    </div>);
}

