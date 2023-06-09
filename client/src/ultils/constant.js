import icons from "./icons"

export const path = {
    HOME: '/*',
    HOME__PAGE: ':page',
    LOGIN: 'login',
    CHO_THUE_CAN_HO: 'cho-thue-can-ho',
    CHO_THUE_MAT_BANG: 'cho-thue-mat-bang',
    NHA_CHO_THUE: 'nha-cho-thue',
    CHO_THUE_PHONG_TRO: 'cho-thue-phong-tro',
    DETAL_POST__TITLE__POSTID: 'chi-tiet/:title/:postId',
    SEARCH: 'tim-kiem',
    SYSTEM: '/he-thong/*',
    CREATE_POST: 'tao-moi-bai-dang',
    MANAGE_POST: 'quan-ly-bai-dang',
    EDIT_ACCOUNT: 'sua-thong-tin-ca-nhan',
    CONTACT: 'lien-he',
    DETAIL: '/chi-tiet/',
    DETAIL_ALL: 'chi-tiet/*',
    RESET_PASSWORD: 'reset-mat-khau/:token',
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    MANAGE_USER: 'quan-ly-thanh-vien',
    MANAGE_POST: 'quan-ly-bai-dang'
}

export const text = {
    HOME_TITLE: 'Kênh thông tin Mặt bằng số 1 Việt Nam',
    HOME_DESCRIPTION: "Kênh thông tin Mặt bằng số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng."
}

export const location = [
    {
        id: 'hcm',
        name: 'Bài đăng ở Hồ Chí Minh',
        image: 'https://ik.imagekit.io/tvlk/blog/2022/09/dia-diem-check-in-sai-gon-1.jpg?tr=dpr-2,w-675',
        provinceCode: 'CUID'
    },
    {
        name: 'Bài đăng ở Hà Nội',
        image: 'https://reviewvilla.vn/wp-content/uploads/2022/05/kinh-nghiem-du-lich-ha-noi-5-1024x577.jpg',
        id: 'hn',
        provinceCode: 'NDOE'
    },
    {
        name: 'Bài đăng ở Đà nẵng',
        image: 'https://phongtro123.com/images/location_dn.jpg',
        id: 'dn',
        provinceCode: 'NNNE'
    },
    {
        name: 'Bài đăng ở Bình Dương',
        image: 'https://images2.thanhnien.vn/Uploaded/truongdx/2022_12_26/anh-1-cd-4204.jpg',
        id: 'bd',
        provinceCode: 'NUDD'
    },
]

export const underMap = ['Bạn đang xem nội dung tin đăng: "', '". Mọi thông tin liên quan đến tin đăng này chỉ mang tính chất tham khảo. Nếu bạn có phản hồi với tin đăng này (báo xấu, tin đã cho thuê, không liên lạc được,...), vui lòng thông báo để PhòngTrọ123 có thể xử lý.']

export const attention = [
    'Nội dung phải viết bằng tiếng Việt có dấu',
    'Tiêu đề tin không dài quá 100 kí tự',
    'Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có hiệu quả hơn.',
    'Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy sửa vị trí tin rao của bạn trên bản đồ bằng cách kéo icon tới đúng vị trí của tin rao.',
    'Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so với tin rao không có ảnh. Hãy đăng ảnh để được giao dịch nhanh chóng!'
]
const { ImPencil2, TbLayoutDashboard, AiOutlineUser, MdOutlineGroups, MdOutlineReportGmailerrorred, AiOutlineFieldTime } = icons
export const memuSidebar = [
    // {
    //     id: 10,
    //     text: 'Tổng quan',
    //     path: path.DASHBOARD,
    //     icon: <TbLayoutDashboard size={24} />
    // },
    {
        id: 30,
        text: 'Quản lý thành viên',
        path: path.MANAGE_USER,
        icon: <MdOutlineGroups size={24} />
    },
    {
        id: 90,
        text: 'Thông tin cá nhân',
        path: path.EDIT_ACCOUNT,
        icon: <AiOutlineUser size={24} />,

    },
    {
        id: 90,
        text: 'Quản lý bài đăng',
        path: path.MANAGE_POST,
        icon: <AiOutlineUser size={24} />,

    },
]