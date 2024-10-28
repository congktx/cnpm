const nhankhau = {
    "status": 200,
    "messageCode": "api.success",
    "message": "API Success",
    "result": {
        "content": [
            {
                "id": 1,
                "hoVaTen": "Hà Đức Dũng",
                "tenKhac": "dũng con",
                "ngaySinh": "2001-02 - 20T07: 00: 00Z",
                "gioiTinh": "Nam",
                "cccd": "0123456789",
                "soHoChieu": "1111",
                "nguyenQuan": "Bình Lục, Hà Nam",
                "danToc": "Kinh",
                "tonGiao": "Không",
                "quocTich": "Việt Nam",
                "noiThuongTru": "An Ninh, Bình Lục, Hà Nam",
                "diaChiHienTai": "An Ninh, Bình Lục, Hà Nam",
                "trinhDoHocVan": "12/12",
                "ngheNghiep": "Sinh viên",
                "noiLamViec": "DH Bách Khoa Hà Nội",
                "quanHeVoiChuHo": "Chủ hộ",
                "isChuHo": true
            },
            {
                "id": 2,
                "hoVaTen": "Hà Đức An",
                "tenKhac": "dũng con",
                "ngaySinh": "2001-02 - 20T07: 00: 00Z",
                "gioiTinh": "Nam",
                "cccd": "0123456788",
                "soHoChieu": "1111",
                "nguyenQuan": "Bình Lục, Hà Nam",
                "danToc": "Kinh",
                "tonGiao": "Không",
                "quocTich": "Việt Nam",
                "noiThuongTru": "An Ninh, Bình Lục, Hà Nam",
                "diaChiHienTai": "An Ninh, Bình Lục, Hà Nam",
                "trinhDoHocVan": "12/12",
                "ngheNghiep": "Sinh viên",
                "noiLamViec": "DH Bách Khoa Hà Nội",
                "quanHeVoiChuHo": "Con",
                "isChuHo": false
            },
            {
                "id": 3,
                "hoVaTen": "Hà Thị Lan",
                "tenKhac": "lan nữ",
                "ngaySinh": "2001-02 - 20T00: 00: 00Z",
                "gioiTinh": "Nữ",
                "cccd": "099999999",
                "soHoChieu": "1111",
                "nguyenQuan": "Bình Lục, Hà Nam",
                "danToc": "Kinh",
                "tonGiao": "Không",
                "quocTich": "Việt Nam",
                "noiThuongTru": "An Ninh, Bình Lục, Hà Nam",
                "diaChiHienTai": "An Ninh, Bình Lục, Hà Nam",
                "trinhDoHocVan": "12/12",
                "ngheNghiep": "Sinh viên",
                "noiLamViec": "DH Bách Khoa Hà Nội",
                "quanHeVoiChuHo": "chủ hộ",
                "isChuHo": true
            },
            {
                "id": 4,
                "hoVaTen": "Hà Thị Lụa",
                "tenKhac": "lụa nữ",
                "ngaySinh": "2001-02 - 20T00: 00: 00Z",
                "gioiTinh": "Nữ",
                "cccd": "099999998",
                "soHoChieu": "1111",
                "nguyenQuan": "Bình Lục, Hà Nam",
                "danToc": "Kinh",
                "tonGiao": "Không",
                "quocTich": "Việt Nam",
                "noiThuongTru": "An Ninh, Bình Lục, Hà Nam",
                "diaChiHienTai": "An Ninh, Bình Lục, Hà Nam",
                "trinhDoHocVan": "12/12",
                "ngheNghiep": "Sinh viên",
                "noiLamViec": "DH Bách Khoa Hà Nội",
                "quanHeVoiChuHo": "con gái",
                "isChuHo": false
            }
        ],
        "pageable": {
            "sort": {
                "sorted": false,
                "unsorted": true,
                "empty": true
            },
            "pageNumber": 0,
            "pageSize": 10,
            "offset": 0,
            "unpaged": false,
            "paged": true
        },
        "totalPages": 1,
        "totalElements": 4,
        "last": true,
        "first": true,
        "sort": {
            "sorted": false,
            "unsorted": true,
            "empty": true
        },
        "numberOfElements": 4,
        "size": 10,
        "number": 0,
        "empty": false
    }
}
const hokhau = {
    "status": 200,
    "messageCode": "api.success",
    "message": "API Success",
    "result": {
        "content": [
            {
                "id": 2,
                "hoTenChuHo": "Hà Thị Lan",
                "cccdChuHo": "099999999",
                "diaChi": "thôn 8, An Ninh, Bình Lục, Hà Nam",
                "nhanKhaus": [
                    {
                        "id": 3,
                        "hoVaTen": "Hà Thị Lan",
                        "tenKhac": "lan nữ",
                        "ngaySinh": "2001-02 - 20T00: 00: 00Z",
                        "gioiTinh": "Nữ",
                        "cccd": "099999999",
                        "soHoChieu": "1111",
                        "nguyenQuan": "Bình Lục, Hà Nam",
                        "danToc": "Kinh",
                        "tonGiao": "Không",
                        "quocTich": "Việt Nam",
                        "noiThuongTru": "An Ninh, Bình Lục, Hà Nam",
                        "diaChiHienTai": "An Ninh, Bình Lục, Hà Nam",
                        "trinhDoHocVan": "12/12",
                        "ngheNghiep": "Sinh viên",
                        "noiLamViec": "DH Bách Khoa Hà Nội",
                        "quanHeVoiChuHo": "chủ hộ",
                        "isChuHo": true
                    },
                    {
                        "id": 4,
                        "hoVaTen": "Hà Thị Lụa",
                        "tenKhac": "lụa nữ",
                        "ngaySinh": "2001-02 - 20T00: 00: 00Z",
                        "gioiTinh": "Nữ",
                        "cccd": "099999998",
                        "soHoChieu": "1111",
                        "nguyenQuan": "Bình Lục, Hà Nam",
                        "danToc": "Kinh",
                        "tonGiao": "Không",
                        "quocTich": "Việt Nam",
                        "noiThuongTru": "An Ninh, Bình Lục, Hà Nam",
                        "diaChiHienTai": "An Ninh, Bình Lục, Hà Nam",
                        "trinhDoHocVan": "12/12",
                        "ngheNghiep": "Sinh viên",
                        "noiLamViec": "DH Bách Khoa Hà Nội",
                        "quanHeVoiChuHo": "con gái",
                        "isChuHo": false
                    }
                ]
            },
            {
                "id": 1,
                "hoTenChuHo": "Hà Đức Tuấn",
                "cccdChuHo": "0111111111",
                "diaChi": "thôn 9, An Ninh, Bình Lục, Hà Nam",
                "nhanKhaus": [
                    {
                        "id": 2,
                        "hoVaTen": "Hà Đức An",
                        "tenKhac": "dũng con",
                        "ngaySinh": "2001-02 - 20T07: 00: 00Z",
                        "gioiTinh": "Nam",
                        "cccd": "0123456788",
                        "soHoChieu": "1111",
                        "nguyenQuan": "Bình Lục, Hà Nam",
                        "danToc": "Kinh",
                        "tonGiao": "Không",
                        "quocTich": "Việt Nam",
                        "noiThuongTru": "An Ninh, Bình Lục, Hà Nam",
                        "diaChiHienTai": "An Ninh, Bình Lục, Hà Nam",
                        "trinhDoHocVan": "12/12",
                        "ngheNghiep": "Sinh viên",
                        "noiLamViec": "DH Bách Khoa Hà Nội",
                        "quanHeVoiChuHo": "Con",
                        "isChuHo": false
                    },
                    {
                        "id": 1,
                        "hoVaTen": "Hà Đức Tuấn",
                        "tenKhac": "dũng con",
                        "ngaySinh": "2001-02 - 20T00: 00: 00Z",
                        "gioiTinh": "Nam",
                        "cccd": "0111111111",
                        "soHoChieu": "1111",
                        "nguyenQuan": "Bình Lục, Hà Nam",
                        "danToc": "Kinh",
                        "tonGiao": "Không",
                        "quocTich": "Việt Nam",
                        "noiThuongTru": "An Ninh, Bình Lục, Hà Nam",
                        "diaChiHienTai": "An Ninh, Bình Lục, Hà Nam",
                        "trinhDoHocVan": "12/12",
                        "ngheNghiep": "Sinh viên",
                        "noiLamViec": "DH Bách Khoa Hà Nội",
                        "quanHeVoiChuHo": "Chủ hộ",
                        "isChuHo": true
                    }
                ]
            }
        ],
        "pageable": {
            "sort": {
                "sorted": false,
                "unsorted": true,
                "empty": true
            },
            "pageNumber": 0,
            "pageSize": 10,
            "offset": 0,
            "unpaged": false,
            "paged": true
        },
        "totalPages": 1,
        "totalElements": 2,
        "last": true,
        "first": true,
        "sort": {
            "sorted": false,
            "unsorted": true,
            "empty": true
        },
        "numberOfElements": 2,
        "size": 10,
        "number": 0,
        "empty": false
    }
}

const hoatdong = {
    "status": 200,
    "messageCode": "api.success",
    "message": "API Success",
    "result": {
        "content": [
            {
                "id": 4,
                "time": "2022-01 - 09T11: 31: 55.344Z",
                "mess": "Tạo mới cuộc họp: Họp tháng 10"
            },
            {
                "id": 3,
                "time": "2022-01 - 09T11: 31: 48.206Z",
                "mess": "Thêm mới hộ khẩu: Hà Đức Dũng"
            },
            {
                "id": 2,
                "time": "2022-01 - 09T11: 31: 18.716Z",
                "mess": "Thêm mới nhân khẩu: Hà Đức An"
            },
            {
                "id": 1,
                "time": "2022-01 - 09T11: 30: 34.126Z",
                "mess": "Thêm mới nhân khẩu: Hà Đức Dũng"
            },
            {
                "id": 9,
                "time": "2022-01 - 09T07: 37: 06.225Z",
                "mess": "Cập nhật hộ khẩu: Hà Đức Tuấn"
            },
            {
                "id": 8,
                "time": "2022-01 - 09T07: 36: 41.428Z",
                "mess": "Thêm mới hộ khẩu: Hà Thị Lan"
            },
            {
                "id": 7,
                "time": "2022-01 - 09T07: 34: 13.065Z",
                "mess": "Sửa thông tin nhân khẩu: Hà Đức Tuấn"
            },
            {
                "id": 6,
                "time": "2022-01 - 09T07: 31: 09.926Z",
                "mess": "Thêm mới nhân khẩu: Hà Thị Lụa"
            },
            {
                "id": 5,
                "time": "2022-01 - 09T07: 29: 49.025Z",
                "mess": "Thêm mới nhân khẩu: Hà Thị Lan"
            }
        ],
        "pageable": {
            "sort": {
                "sorted": false,
                "unsorted": true,
                "empty": true
            },
            "pageNumber": 0,
            "pageSize": 10,
            "offset": 0,
            "unpaged": false,
            "paged": true
        },
        "totalPages": 1,
        "totalElements": 9,
        "last": true,
        "first": true,
        "sort": {
            "sorted": false,
            "unsorted": true,
            "empty": true
        },
        "numberOfElements": 9,
        "size": 10,
        "number": 0,
        "empty": false
    }
}

const so_hokhau_nhankhau = {
    "status": 200,
    "messageCode": "api.success",
    "message": "API Success",
    "result": {
        "soHoKhau": 2,
        "soNhanKhau": 4,
        "soTamVang": 0,
        "soTamTru": 0
    }
}

const tamtru = {
    "status": 200,
    "messageCode": "api.success",
    "message": "API Success",
    "result": {
        "content": [
            {
                "id": 1,
                "hoVaTen": "Hà Đức A",
                "cccd": "0987654321",
                "diaChi": "Hà Nam",
                "tuNgay": "2020-10 - 10T00: 00: 00Z",
                "denNgay": "2020-11 - 20T00: 00: 00Z",
                "lyDo": "Đi học"
            }
        ],
        "pageable": {
            "sort": {
                "sorted": false,
                "unsorted": true,
                "empty": true
            },
            "pageNumber": 0,
            "pageSize": 20,
            "offset": 0,
            "unpaged": false,
            "paged": true
        },
        "totalPages": 1,
        "totalElements": 1,
        "last": true,
        "first": true,
        "sort": {
            "sorted": false,
            "unsorted": true,
            "empty": true
        },
        "numberOfElements": 1,
        "size": 20,
        "number": 0,
        "empty": false
    }
}

const tamvang = {
    "status": 200,
    "messageCode": "api.success",
    "message": "API Success",
    "result": {
        "content": [
            {
                "id": 2,
                "hoVaTen": "Hà Đức B",
                "cccd": "0876543211",
                "diaChi": "Hà Nam",
                "tuNgay": "2020-10 - 10T00: 00: 00Z",
                "denNgay": "2020-11 - 20T00: 00: 00Z",
                "lyDo": "Đi học làm phu nơi khác"
            },
            {
                "id": 1,
                "hoVaTen": "Hà Đức Tú",
                "cccd": "0876543222",
                "diaChi": "Hà Nam",
                "tuNgay": "2020-10 - 10T00: 00: 00Z",
                "denNgay": "2020-11 - 20T00: 00: 00Z",
                "lyDo": "Đi học làm phu nơi khác"
            }
        ],
        "pageable": {
            "sort": {
                "sorted": false,
                "unsorted": true,
                "empty": true
            },
            "pageNumber": 0,
            "pageSize": 20,
            "offset": 0,
            "unpaged": false,
            "paged": true
        },
        "totalPages": 1,
        "totalElements": 2,
        "last": true,
        "first": true,
        "sort": {
            "sorted": false,
            "unsorted": true,
            "empty": true
        },
        "numberOfElements": 2,
        "size": 20,
        "number": 0,
        "empty": false
    }
}

const cuochop = {
    "status": 200,
    "messageCode": "api.success",
    "message": "API Success",
    "result": {
        "content": [
            {
                "id": 2,
                "tieuDe": "Họp tháng 12",
                "thoiGian": "2021-12-31T13:00:00Z",
                "diaDiem": "nhà văn hóa thôn",
                "noiDung": "Họp tổng kết tháng 12",
                "banBaoCao": "13h: Có mặt\n14h: Đọc báo cáo\n15h: Tan",
                "nguoiTao": "Hà Đức Tuấn",
                "hoKhaus": [
                    {
                        "id": 1,
                        "hoTenChuHo": "Hà Đức Tuấn"
                    }
                ],
                "thamGia": 0,
                "vangMat": 1
            },
            {
                "id": 1,
                "tieuDe": "Họp tháng 10",
                "thoiGian": "2021-10-30T13:00:00Z",
                "diaDiem": "nhà văn hóa thôn",
                "noiDung": "Họp tổng kết tháng 10",
                "banBaoCao": "13h: Có mặt ...",
                "nguoiTao": "Hà Đức Tuấn",
                "hoKhaus": [
                    {
                        "id": 1,
                        "hoTenChuHo": "Hà Đức Tuấn"
                    },
                    {
                        "id": 2,
                        "hoTenChuHo": "Hà Thị Lan"
                    }
                ],
                "thamGia": 1,
                "vangMat": 1
            }
        ],
        "pageable": {
            "sort": {
                "sorted": false,
                "unsorted": true,
                "empty": true
            },
            "pageNumber": 0,
            "pageSize": 20,
            "offset": 0,
            "unpaged": false,
            "paged": true
        },
        "totalPages": 1,
        "totalElements": 2,
        "last": true,
        "first": true,
        "sort": {
            "sorted": false,
            "unsorted": true,
            "empty": true
        },
        "numberOfElements": 2,
        "size": 20,
        "number": 0,
        "empty": false
    }
}

export { hokhau, hoatdong, nhankhau, cuochop, tamtru, tamvang, so_hokhau_nhankhau }