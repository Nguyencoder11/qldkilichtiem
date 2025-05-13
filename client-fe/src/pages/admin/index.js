import lich from '../../assest/images/lich.png'
import { useState, useEffect, useRef } from 'react'
import { getMethod } from '../../services/request'
import { formatMoney } from '../../services/money'
import Chart from "chart.js/auto";


var token = localStorage.getItem("token");


const HomeAdmin = () => {
    const [doanhthu, setDoanhThu] = useState(0);
    const [donHoanThanhHomNay, setDonHoanThanhHomNay] = useState(0);
    const [items, setItems] = useState([]);
    const [chartType, setChartType] = useState('bar');
    const chartRef = useRef(null);

    async function revenueYear(nam) {

        if (nam < 2000) {
            nam = new Date().getFullYear()
        }
        var url = 'http://localhost:8080/api/statistic/admin/revenue-year?year=' + nam;
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        });
        var list = await response.json();
        console.log(list)
        var chartData = list.map(value => value || 0)

        let ctx = chartRef.current.getContext("2d");

        if (Chart.getChart(ctx)) {
            Chart.getChart(ctx).destroy();
        }

        const chartOptions = {
            scales: {
                y: {
                    ticks: {
                        callback: function (value) {
                            return formatmoney(value);
                        }
                    }
                }
            }
        }

        const lineColor = 'rgba(255, 0, 0, 1)'; // Màu đỏ cho line chart
        const lineBackgroundColor = 'rgb(255, 229, 229)'; // Màu nền cho line chart
        // Du lieu bieu do
        const chartDataObj = {
            labels: chartType === 'pie'
                ? ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4']
                : ["tháng 1", "tháng 2", "tháng 3", "tháng 4", "tháng 5", "tháng 6", "tháng 7", "tháng 8", "tháng 9", "tháng 10", "tháng 11", "tháng 12"],
            datasets: [{
                label: 'Doanh thu năm ' + nam,
                backgroundColor: chartType === 'pie'
                    ? ['#4e73df', '#1cc88a', '#36b9cc', '#eb9534']  // Mỗi quý một màu cho pie chart
                    : chartType === 'line'
                        ? lineBackgroundColor
                        : 'rgba(121, 0, 177, 0.7)', // Màu nền cho bar chart
                borderColor: chartType === 'line'
                    ? lineColor
                    : undefined,
                fill: chartType === 'line',
                data: chartType === 'pie'
                    ? [
                        chartData.slice(0, 3).reduce((sum, val) => sum + val, 0),
                        chartData.slice(3, 6).reduce((sum, val) => sum + val, 0),
                        chartData.slice(6, 9).reduce((sum, val) => sum + val, 0),
                        chartData.slice(9, 12).reduce((sum, val) => sum + val, 0)
                    ]
                    : chartData,
            }]
        }

        new Chart(ctx, {
            type: chartType, // Đặt loại biểu đồ theo lựa chọn của người dùng
            data: chartDataObj,
            options: chartOptions
        });
    }

    useEffect(() => {

        function getMauSac() {
            var arr = ['#4e73df', '#1cc88a', '#36b9cc', '#eb9534', '#ed00c6', '#edd500']
            var act = document.getElementsByClassName("border-left");
            var lbcard = document.getElementsByClassName("lbcard");
            for (var i = 0; i < act.length; i++) {
                act[i].style.borderLeft = '.25rem solid ' + arr[i]
            }
            for (var i = 0; i < lbcard.length; i++) {
                lbcard[i].style.color = arr[i]
            }
        }
        getMauSac();

        var nowYear = new Date().getFullYear();
        revenueYear(nowYear)
        var main = ''
        for (var i = nowYear; i > Number(nowYear) - Number(10); i--) {
            main += `<option value="${i}">Năm ${i}</option>`
        }
        document.getElementById("nams").innerHTML = main

        const getVaccine = async () => {
            var response = await getMethod('/api/statistic/admin/vaccine-bc');
            var result = await response.json();
            setItems(result)
        };
        getVaccine();

        const getDt = async () => {
            var response = await getMethod('/api/statistic/admin/thong-ke');
            var result = await response.json();
            console.log(result);

            setDoanhThu(result)
        };
        getDt();
    }, []);

    let debounceTimeout;
    function loadByNam() {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            var nam = document.getElementById("nams").value;
            revenueYear(nam);
        }, 200)
    }

    function handleChartTypeChange(e) {
        setChartType(e.target.value);
    }
    useEffect(() => {
        const year = document.getElementById("nams")?.value || new Date().getFullYear();
        revenueYear(year);
    }, [chartType]);


    return (
        <>
            <div className="row">
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left shadow h-100 py-2">
                        <span className="lbcard">Doanh thu tháng này</span>
                        <span className='solieudoanhthu'>{formatMoney(doanhthu.doanhThuThangNay)}</span>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left shadow h-100 py-2">
                        <span className="lbcard">Doanh thu hôm nay</span>
                        <span className='solieudoanhthu'>{formatMoney(doanhthu.doanhThuHomNay)}</span>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left shadow h-100 py-2">
                        <span className="lbcard">Số lượng tài khoản</span>
                        <span className='solieudoanhthu'>{doanhthu.nunUser}</span>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left shadow h-100 py-2">
                        <span className="lbcard">Số lượng vaccine hiện có</span>
                        <span className='solieudoanhthu'>{doanhthu.nunVaccine}</span>
                    </div>
                </div>
            </div>

            <div>
                <div className="col-sm-12 header-sp-thongke row ">
                    <div className="col-md-3">
                        <label className="lbbooking">Chọn loại biểu đồ</label>
                        <select id="chartType" className="form-control" onChange={handleChartTypeChange}>
                            <option value="bar">Biểu đồ cột</option>
                            <option value="line">Biểu đồ đường</option>
                            <option value="pie">Biểu đồ tròn (theo quý)</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="lbbooking">Chọn năm cần xem</label>
                        <select id="nams" className="form-control">
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label className="lbbooking whitespace" dangerouslySetInnerHTML={{ __html: '<span>&ThinSpace;</span>' }}></label>
                        <button onClick={() => loadByNam()} className="btn btn-primary form-control"><i className="fa fa-filter"></i> Lọc</button>
                    </div>
                </div>
                <div className="col-sm-12 divtale">
                    <div className="card chart-container divtale">
                        <canvas ref={chartRef} id="chart" style={{ maxHeight: '1000px', maxWidth: '1230px' }}></canvas>
                    </div>
                </div>
            </div>

            <div className="tablediv">
                <div className="headertable">
                    <span className="lbtable">Danh sách vaccine tiêm nhiều</span>
                </div>
                <div className="divcontenttable">
                    <table id="example" className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Tên vaccine</th>
                                <th>Giá bán</th>
                                <th>Loại vaccine</th>
                                <th>Số lượng tiêm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item => {
                                return <tr>
                                    <td>{item.vaccine.id}</td>
                                    <td>{item.vaccine.name}</td>
                                    <td>{formatMoney(item.vaccine.price)}</td>
                                    <td>{item.vaccine.vaccineType.typeName}</td>
                                    <td>{item.sold}</td>
                                </tr>
                            }))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
}

function formatmoney(money) {
    return VND.format(money);
}

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

export default HomeAdmin; 