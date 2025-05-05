"use client";
import { useState } from "react";
import { Button, Select, SelectItem } from "@heroui/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
const types = [
    { key: "mac-dinh", label: "Mặc định" },
    { key: "nam", label: "Năm" },
    { key: "luot-xem", label: "Lượt xem" },
];
type QueryParams = {
    type: string,
    category: string,
    country: string,
    year: string,
    sort: string,
    page: number
}
function MovieSort({ queryParams }: { queryParams:QueryParams }) {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [valueType, setValueType] = useState(queryParams.sort);

    const handleSelectionChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValueType(e.target.value);
        const params = new URLSearchParams(searchParams!.toString());
        if (e.target.value === "mac-dinh") {
            params.delete("sort");
        } else {
            params.set("sort", e.target.value);
        }
      
        router.push(`${pathname}?${params.toString()}`);
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