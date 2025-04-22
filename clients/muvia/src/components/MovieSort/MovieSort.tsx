"use client";
import { useState } from "react";
import { Button, Select, SelectItem } from "@heroui/react";
const types = [
    { key: "mac-dinh", label: "Mặc định" },
    { key: "theo-nam", label: "Năm" },
    { key: "danh-gia", label: "Đánh giá" },
    { key: "luot-xem", label: "Lượt xem" },
];
function MovieSort() {
    const [valueType, setValueType] = useState("mac-dinh");
    const handleSelectionChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValueType(e.target.value);
    };
    return (
        <div className="p-[20px] flex justify-start gap-8 items-center">
            <p className="text-white font-bold text-[1.2rem] inline">Sắp xếp</p>
            <Select className="w-60" size="sm" label="Theo" selectedKeys={[valueType]}
                onChange={handleSelectionChangeType}>
                {types.map((animal) => (
                    <SelectItem key={animal.key}>{animal.label}</SelectItem>
                ))}
            </Select>
        </div>
    )
}

export default MovieSort