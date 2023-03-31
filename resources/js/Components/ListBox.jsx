import React, { useState } from 'react';
import { router } from '@inertiajs/react'

import { GrRefresh, GrAdd } from 'react-icons/gr';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';

export default function ListBox({ selected, setSelected, data }) {

    const handleCheckboxChange = (el) => {
        if (el.checked) {
            setSelected([...selected, el.attributes['data-key'].value])
        }else{
            setSelected(selected.filter(item => item !== el.attributes['data-key'].value))
        }
    }
    return (
        <div className="md:mx-14 bg-white dark:bg-gray-900 text-white shadow-sm shadow-gray-700 rounded-lg -translate-y-24">
            <div className="border-b p-[22px] flex items-center justify-between">
                <div className="flex items-center">
                    <div className="md:block w-6 md:w-14">
                        <div className="hidden md:block">
                            <Checkbox handleChange={(e) => {
                                const checkboxes = document.querySelectorAll('input[name="mangaList"]');
                                if(e.target.checked){
                                    setSelected(data.map(item => item.id))
                                    checkboxes.forEach(checkbox => checkbox.checked = true);
                                }else{
                                    setSelected([])
                                    checkboxes.forEach(checkbox => checkbox.checked = false);
                                }
                            }} />
                        </div>
                    </div>
                    <span>Showing x of xx</span>
                    {selected}
                </div>
                <div className="hidden md:block flex items-center space-x-4">
                    <PrimaryButton className="px-2 py-1.5 text-[12px]">
                        <GrRefresh size={20} className="mr-2 animate-spin" />
                        Refresh
                    </PrimaryButton>
                    <PrimaryButton 
                        type="button"
                        className="px-2 py-1.5 text-[12px] text-white dark:text-white bg-blue-700 dark:bg-blue-800 hover:bg-blue-700 hover:dark:bg-blue-700 focus:bg-blue-600 dark:focus:bg-blue-700 active:bg-blue-700 dark:active:bg-blue-800"
                        // onClick={() => router.visit('dashboard.cronChapters', { only: ['bookmarks'] })}
                        href={route('dashboard.cronChapters')}
                        only={['bookmarks']}
                    >
                        <GrAdd size={20} className="mr-2" />
                        Add Manga
                    </PrimaryButton>
                </div>
            </div>
            <ul className="divide-y">
                {data.map((item, index) => (
                    <li key={item.id} className="p-6 flex items-center">
                        <div className="flex w-6 md:w-14 px-0 items-center">
                            <div className="hidden md:block">
                                <Checkbox dataKey={item.id} name={"mangaList"} className="basis-1/2" handleChange={(e) => handleCheckboxChange(e.target)}/>
                            </div>
                            <span className="basis-1/2 md:text-center grow">0</span>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center w-full">
                            <span className="basis-1/2">{item['manga_website'].manga.title}</span>
                            <span className="basis-1/4">{item.status}</span>
                            <div className="flex basis-1/2 items-center space-x-4 md:justify-start">
                                <span className="md:basis-1/2 text-left">{item.last_read_chapter}</span>
                                <span className="md:basis-1/2 text-left">{item.latest_chapter}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}