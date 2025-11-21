'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()

    const [search, updateSearch] = useState('');

    const updateFilter = (value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value) {
            params.set('search', value);
        } else {
            params.delete('search');
        }
        router.replace(`${pathname}?${params.toString()}`);
    }

    useEffect(() => {
        const currentSearch = searchParams.get('search');
        updateSearch(currentSearch ?? '');
    }, [searchParams]);

    return (
        <div className="search">
            <div className="search-wrapper">
                <input
                    className="search-wrapper_input"
                    type="text"
                    value={search}
                    onChange={(e) => updateSearch(e.target.value)}
                />
            </div>
            <div className="search-btn">
                <button
                    onClick={() => updateFilter(search)}
                ></button>
            </div>
        </div>
    )
}