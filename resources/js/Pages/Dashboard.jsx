import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { readingStatusOption, mangaStatusOption, tagsOptions, mangaList } from '@/Data/Constant';
import Selector from '@/Components/Selector';
import ListBox from '@/Components/ListBox';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { PiSortAscending } from "react-icons/pi";

export default function Dashboard(props) {
    const [selectedManga, setSelectedManga] = useState([]);
    const [readingStatus, setReadingStatus] = useState(readingStatusOption[0].value);
    const [mangaStatus, setMangaStatus] = useState(mangaStatusOption[0].value);
    const [tags, setTags] = useState();
    console.log(readingStatus, mangaStatus, tags, );

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div>
                <div className="max-w-none mx-auto h-full">
                    <div className="bg-white sm:px-8 lg:px-12 dark:bg-gray-800 shadow-sm">
                        <div className="pt-8 px-3 md:px-2 pb-32 flex flex-col md:flex-row space-y-2 md:space-y-0 items-center max-w-full md:justify-between">
                            <div className="flex w-full items-center flex-col md:flex-row md:space-x-2 md:space-y-0 space-y-2">
                                <Selector
                                    key="readingStatus"
                                    className="md:w-[166px] lg:w-48"
                                    options={readingStatusOption}
                                    handleChange={setReadingStatus}
                                />
                                <Selector
                                    key="filterTags"
                                    placeholder="Filter by tags"
                                    className="md:w-[166px] lg:w-48"
                                    options={tagsOptions}
                                    handleChange={setTags}
                                />
                                <Selector
                                    key="mangaStatus"
                                    className="md:w-[166px] lg:w-48"
                                    options={mangaStatusOption}
                                    handleChange={setMangaStatus}
                                    prefix={
                                        <>
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                                <span className="text-gray-500 sm:text-sm">
                                                    <PiSortAscending size="20" />
                                                </span>
                                            </div>
                                        </>
                                    }
                                />
                                <div className="w-full flex grow md:justify-end ">
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                            <span className="text-gray-500 sm:text-sm">
                                                <RxMagnifyingGlass size="20" />
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            className="md:w-[166px] lg:w-60 rounded px-3 py-1 w-full pl-8"
                                            placeholder="Input manga title"
                                            onChange={(e) => console.log(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ListBox
                    selected={selectedManga}
                    setSelected={setSelectedManga}
                    data={props.bookmarks}
                />
            </div>
        </AuthenticatedLayout>
    );
}
