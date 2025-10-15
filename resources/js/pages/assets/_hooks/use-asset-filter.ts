import { router } from "@inertiajs/react";
import { useRef, useState } from "react";
import { useDebounce } from "react-use";

export default function useAssetFilters(initialRole?: string, initialType?: string) {
        const [searchTerm, setSearchTerm] = useState('');
        const isFirstRenderSearch = useRef(true);
        const isFirstRenderTipe = useRef(true);
        const isFirstRenderTab = useRef(true);

        const [tab, setTab] = useState<string>(initialRole ?? 'superadmin');
        const [tipe, setTipe] = useState<string>(initialType ?? '');

        useDebounce(
            () => {
                if (isFirstRenderSearch.current) {
                    isFirstRenderSearch.current = false;
                    return;
                }

                router.get(
                    `/master/assets?search=${searchTerm}`,
                    {},
                    {
                        preserveState: true,
                        preserveScroll: true,
                    },
                );
            },
            500,
            [searchTerm],
        );

        useDebounce(
            () => {
                if (isFirstRenderTipe.current) {
                    isFirstRenderTipe.current = false;
                    return;
                }

                router.get(
                    `/master/assets?tipe=${tipe === 'all' ? '' : tipe}`,
                    {},
                    {
                        preserveState: true,
                        preserveScroll: true,
                    },
                );
            },
            500,
            [tipe],
        );

        useDebounce(
            () => {
                if (isFirstRenderTab.current) {
                    isFirstRenderTab.current = false;
                    return;
                }

                router.get(
                    `/master/assets?role=${tab}`,
                    {},
                    {
                        preserveState: true,
                        preserveScroll: true,
                    },
                );
            },
            500,
            [tab],
        );

    return { searchTerm, setSearchTerm, tab, setTab, tipe, setTipe };
}
