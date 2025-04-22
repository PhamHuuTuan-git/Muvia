"use client";
import { useState } from "react";
import { Button, Select, SelectItem } from "@heroui/react";

const types = [
    { key: "tat-ca", label: "Tất cả" },
    { key: "phim-bo", label: "Phim bộ" },
    { key: "phim-le", label: "Phim lẻ" },
    { key: "tv-show", label: "TV Show" },
];

const categories = [
    { key: "tat-ca", label: "Tất cả" },
    {
        label: "Tình Cảm",
        key: "tinh-cam"
    },
    {
        label: "Chính kịch",
        key: "chinh-kich"
    },
    {
        label: "Hành Động",
        key: "hanh-dong"
    },
    {
        label: "Tâm Lý",
        key: "tam-ly"
    },
    {
        label: "Hình Sự",
        key: "hinh-su"
    },
    {
        label: "Phiêu Lưu",
        key: "phieu-luu"
    },
    {
        label: "Cổ Trang",
        key: "co-trang"
    },
    {
        label: "Hài Hước",
        key: "hai-huoc"
    },
    {
        label: "Bí ẩn",
        key: "bi-an"
    },
    {
        label: "Võ Thuật",
        key: "vo-thuat"
    },
    {
        label: "Viễn Tưởng",
        key: "vien-tuong"
    },
    {
        label: "Khoa Học",
        key: "khoa-hoc"
    },
    {
        label: "Kinh Dị",
        key: "kinh-di"
    },
    {
        label: "Học Đường",
        key: "hoc-duong"
    },
    {
        label: "Tài Liệu",
        key: "tai-lieu"
    },
    {
        label: "Chiến Tranh",
        key: "chien-tranh"
    },
    {
        label: "Gia Đình",
        key: "gia-dinh"
    },
    {
        label: "Thể Thao",
        key: "the-thao"
    },
    {
        label: "Âm Nhạc",
        key: "am-nhac"
    },
    {
        label: "Phim 18+",
        key: "phim-18"
    },
    {
        label: "Kinh Điển",
        key: "kinh-dien"
    },
    {
        label: "Thần Thoại",
        key: "than-thoai"
    }
]

const countries = [
    { key: "tat-ca", label: "Tất cả" },
    {
        label: "Hàn Quốc",
        key: "han-quoc"
    },
    {
        label: "Trung Quốc",
        key: "trung-quoc"
    },
    {
        label: "Thái Lan",
        key: "thai-lan"
    },
    {
        label: "Anh",
        key: "anh"
    },
    {
        label: "Âu Mỹ",
        key: "au-my"
    },
    {
        label: "Việt Nam",
        key: "viet-nam"
    },
    {
        label: "Thổ Nhĩ Kỳ",
        key: "tho-nhi-ky"
    },
    {
        label: "Ý",
        key: "y"
    },
    {
        label: "Nhật Bản",
        key: "nhat-ban"
    },
    {
        label: "Ấn Độ",
        key: "an-do"
    },
    {
        label: "Quốc Gia Khác",
        key: "quoc-gia-khac"
    },
    {
        label: "Pháp",
        key: "phap"
    },
    {
        label: "Ả Rập Xê Út",
        key: "a-rap-xe-ut"
    },
    {
        label: "Singapore",
        key: "singapore"
    },
    {
        label: "Nam Phi",
        key: "nam-phi"
    },
    {
        label: "Philippines",
        key: "philippines"
    },
    {
        label: "Tây Ban Nha",
        key: "tay-ban-nha"
    },
    {
        label: "Indonesia",
        key: "indonesia"
    },
    {
        label: "Đức",
        key: "duc"
    },
    {
        label: "Bỉ",
        key: "bi"
    },
    {
        label: "Hồng Kông",
        key: "hong-kong"
    },
    {
        label: "Đài Loan",
        key: "dai-loan"
    },
    {
        label: "Đan Mạch",
        key: "dan-mach"
    },
    {
        label: "Brazil",
        key: "brazil"
    },
    {
        label: "Malaysia",
        key: "malaysia"
    },
    {
        label: "Úc",
        key: "uc"
    },
    {
        label: "Châu Phi",
        key: "chau-phi"
    },
    {
        label: "Ba lan",
        key: "ba-lan"
    },
    {
        label: "Canada",
        key: "canada"
    },
    {
        label: "Mexico",
        key: "mexico"
    },
    {
        label: "Thụy Điển",
        key: "thuy-dien"
    },
    {
        label: "Colombia",
        key: "colombia"
    },
    {
        label: "Bồ Đào Nha",
        key: "bo-dao-nha"
    },
    {
        label: "Argentina",
        key: "argentina"
    },
    {
        label: "Hà Lan",
        key: "ha-lan"
    },
    {
        label: "Phần Lan",
        key: "phan-lan"
    },
    {
        label: "Nga",
        key: "nga"
    },
    {
        label: "Hy Lạp",
        key: "hy-lap"
    },
    {
        label: "Thụy Sĩ",
        key: "thuy-si"
    },
    {
        label: "Nigeria",
        key: "nigeria"
    },
    {
        label: "Na Uy",
        key: "na-uy"
    },
    {
        label: "Chile",
        key: "chile"
    },
    {
        label: "Ukraina",
        key: "ukraina"
    }
]

const years = Array.from({ length: 2025 - 1958 + 1 }, (_, i) => {
    const year = (2025 - i).toString();
    return { key: year, label: year };
});
years.unshift({ key: "tat-ca", label: "Tất cả" },)
function MoviesFilter() {
    const [valueType, setValueType] = useState("tat-ca");
    const [valueCate, setValueCate] = useState("tat-ca");
    const [valueCountry, setValueCountry] = useState("tat-ca");
    const [valueYear, setValueYear] = useState("tat-ca");
    const handleSelectionChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValueType(e.target.value);
    };
    const handleSelectionChangeCate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValueCate(e.target.value);
    };
    const handleSelectionChangeCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValueCountry(e.target.value);
    };
    const handleSelectionChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValueYear(e.target.value);
    };
    return (
        <div className="p-[20px]">
            <p className="text-white font-bold text-[1.2rem] w-full">Bộ lọc</p>
            <div key="sm" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 p-[12px] items-center">
                <Select size="sm" label="Định dạng" selectedKeys={[valueType]}
                    onChange={handleSelectionChangeType}>
                    {types.map((animal) => (
                        <SelectItem key={animal.key}>{animal.label}</SelectItem>
                    ))}
                </Select>
                <Select size="sm" label="Thể loại" selectedKeys={[valueCate]}
                    onChange={handleSelectionChangeCate}>
                    {categories.map((animal) => (
                        <SelectItem key={animal.key}>{animal.label}</SelectItem>
                    ))}
                </Select>
                <Select size="sm" label="Quốc gia" selectedKeys={[valueCountry]}
                    onChange={handleSelectionChangeCountry}>
                    {countries.map((animal) => (
                        <SelectItem key={animal.key}>{animal.label}</SelectItem>
                    ))}
                </Select>
                <Select size="sm" label="Năm" selectedKeys={[valueYear]}
                    onChange={handleSelectionChangeYear}>
                    {years.map((animal) => (
                        <SelectItem key={animal.key}>{animal.label}</SelectItem>
                    ))}
                </Select>

                <Button className="bg-[#a94242] text-white font-bold ">Lọc</Button>
            </div>
        </div>
    )
}

export default MoviesFilter