import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { readingStatusOption, mangaStatusOption, tagsOptions, mangaList } from '@/Data/Constant';
import Selector from '@/Components/Selector';
import ListBox from '@/Components/ListBox';

import Select, { components  } from 'react-select';

export default function Dashboard(props) {
    const [selectedManga, setSelectedManga] = useState([]);
    const [readingStatus, setReadingStatus] = useState();
    const [mangaStatus, setMangaStatus] = useState();
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
                                    preSelected={readingStatusOption[0]}
                                    handleChange={setReadingStatus}
                                />
                                <Selector
                                    key="filterTags"
                                    placeholder="Filter by tags"
                                    className="md:w-[166px] lg:w-48"
                                    options={tagsOptions}
                                    preSelected={tagsOptions[0]}
                                    handleChange={setTags}
                                />
                                <Selector
                                    key="mangaStatus"
                                    className="md:w-[166px] lg:w-48"
                                    options={mangaStatusOption}
                                    preSelected={mangaStatusOption[0]}
                                    handleChange={setMangaStatus}
                                />
                                <div className="w-full flex grow md:justify-end ">
                                    <Selector
                                        key="searchManga"
                                        className="md:w-[166px] lg:w-60"
                                        options={tagsOptions}
                                        isSelectDropdown={false}
                                        isInputbox={true}
                                        handleChange={(e) => console.log(e.target.value)}
                                    />
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
