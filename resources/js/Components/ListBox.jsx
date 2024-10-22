import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react'

import { RxMagnifyingGlass } from 'react-icons/rx';
import { PiSortAscending } from 'react-icons/pi';
import { GrRefresh } from 'react-icons/gr';
import { RiCloseFill } from "react-icons/ri";
import { GoPlus } from "react-icons/go";
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import Pagination from './Pagination';
import '../../scss/main.scss';
import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import queryString from 'query-string';
import Selector from './Selector';
import Modal from './Modal';
import InputLabel from './InputLabel';
import TextInput from './TextInput';
import InputError from './InputError';

export default function ListBox({ data, limit = 50, offset = 0 }) {
    const [selected, setSelected] = useState([]);
    const [filters, setFilters] = useState(queryString.parse(location.search));
    const [showAddModal, setShowAddModal] = useState(false);

    const handleCheckboxChange = (el) => {
        if (el.checked) {
            setSelected([...selected, el.attributes['data-key'].value])
        }else{
            setSelected(selected.filter(item => item !== el.attributes['data-key'].value))
        }
    }

    useEffect(() => {
        if(Object.keys(filters).length){
            (Object.keys(filters)).map((key) => {
                if(filters[key] == '' || (key == 'page' && filters[key] == 1)){
                    delete filters[key];
                }
            });
            filter(filters);
        }
    }, [filters]);

    const filter = useDebouncedCallback(
        (filters) => {
            router.get(
                route(route().current()),
                filters,
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }, 250
    )

    return (
        <div>
            <div className="max-w-none mx-auto h-full">
                <div className="bg-white px-8 sm:px-0 dark:bg-gray-800 shadow-sm">
                    <div className="md:max-w-[80%] md:mx-auto pt-8 px-3 md:px-0 pb-32 flex flex-col md:flex-row space-y-2 md:space-y-0 items-center max-w-full md:justify-between">
                        <div className="flex w-full items-center flex-col md:flex-row md:space-x-2 md:space-y-0 space-y-2">
                            {/* <Selector
                                key="readingStatus"
                                className="md:w-[166px] lg:w-48"
                                options={[]}
                                handleChange={() => {}}
                            />
                            <Selector
                                key="filterTags"
                                placeholder="Filter by tags"
                                className="md:w-[166px] lg:w-48"
                                options={[]}
                                handleChange={() => {}}
                            />
                            <Selector
                                key="mangaStatus"
                                className="md:w-[166px] lg:w-48"
                                options={[]}
                                handleChange={() => {}}
                                prefix={
                                    <>
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                            <span className="text-gray-500 sm:text-sm">
                                                <PiSortAscending size="20" />
                                            </span>
                                        </div>
                                    </>
                                }
                            /> */}
                            <div className="w-full flex grow md:justify-end ">
                                <div className="relative">
                                    {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                        <span className="text-gray-500 sm:text-sm">
                                            <RxMagnifyingGlass size="20" />
                                        </span>
                                    </div> */}
                                    <label htmlFor="" className="relative">
                                        <RxMagnifyingGlass size="20" className='pointer-events-none absolute top-0 transform left-2' />
                                        <input
                                            type="text"
                                            className="md:w-[166px] lg:w-60 rounded px-3 py-1 w-full pl-8"
                                            placeholder="Input manga title"
                                            onChange={(e) => setFilters({...filters, search: e.target.value})}
                                            value={filters.search ?? ''}
                                        />
                                        {filters.search &&
                                            <RiCloseFill onClick={() => setFilters({...filters, search: ''})} size="20" className='cursor-pointer absolute top-0 transform right-2' />
                                        }
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:mx-auto md:max-w-[80%] bg-white border-t dark:border-black dark:bg-gray-800 text-black dark:text-white shadow-lg shadow-gray-300 dark:shadow-none rounded-xl -translate-y-24">
                <div className="border-b p-[22px] flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="md:block w-6 md:w-14">
                            <div className="hidden md:block">
                                <Checkbox handleChange={(e) => {
                                    const checkboxes = document.querySelectorAll('input[name="jobList"]');
                                    if(e.target.checked){
                                        setSelected(data.data.map(item => item.id))
                                        checkboxes.forEach(checkbox => checkbox.checked = true);
                                    }else{
                                        setSelected([])
                                        checkboxes.forEach(checkbox => checkbox.checked = false);
                                    }
                                }} />
                            </div>
                        </div>
                        {selected.length > 0 ?
                            <span>{selected.length} selected</span>
                        :
                            <span>Showing {data.from} to {data.to} of {data.total}</span>
                        }
                    </div>
                    <div className="hidden md:block flex items-center space-x-4">
                        <PrimaryButton className="px-2 py-1.5 text-[12px]">
                            <GrRefresh size={20} className="mr-2 animate-spin" />
                            Refresh
                        </PrimaryButton>
                        <PrimaryButton
                            type="button"
                            className="px-2 py-1.5 text-[12px] text-white dark:text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 hover:dark:bg-blue-800 focus:bg-blue-600 dark:focus:bg-blue-700 active:bg-blue-700 dark:active:bg-blue-800"
                            // onClick={() => router.visit('dashboard.cronChapters', { only: ['bookmarks'] })}
                            // href={route('dashboard')}
                            onClick={() => setShowAddModal(true)}
                            only={['bookmarks']}
                        >
                            <GoPlus size={20} className="mr-2 text-white" />
                            Add Jobs
                        </PrimaryButton>
                    </div>
                </div>
                <ul className="divide-y text-black dark:text-white">
                    {data.data.map((item, index) => (
                        <li key={item.id} className="py-2 px-6 flex items-center hover:bg-gray-100 dark:hover:bg-gray-900">
                            <div className="flex w-6 md:w-14 px-0 items-center">
                                <div className="hidden md:block">
                                    <Checkbox dataKey={item.id} name={"jobList"} className="basis-1/2" handleChange={(e) => handleCheckboxChange(e.target)}/>
                                </div>
                                {/* <span className="basis-1/2 md:text-center grow">0</span> */}
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center w-full">
                                <div className="basis-1/2 flex flex-col">
                                    <span className="basis-1/2">{item.customer.name}</span>
                                    <span className="basis-1/2">{item.created_at}</span>
                                    <span className="basis-1/2"><span>Created By : </span>{item.created_by.name}</span>
                                </div>
                                <div className="flex basis-1/2 items-center space-x-4 md:justify-start">
                                    <div className="flex flex-col h-[80px] gap-1 flex-wrap justify-center">
                                    {item.services.map((service, index) => (
                                        <span key={item.id} className="ml-12 text-left">{service.name}</span>
                                    ))}
                                    </div>
                                </div>
                                <span className="basis-1/4">{item.description}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="border-t p-[22px] flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="md:block w-6 md:w-14">
                        </div>
                        <span>Showing {offset+1} to {offset == 0 ? data.data.length : (offset+limit)} of {data.data.length}</span>
                    </div>
                    <div className="hidden md:block flex items-center space-x-4">
                        <Pagination paginateItems={data} filters={filters} />
                    </div>
                </div>
            </div>
            <Modal show={showAddModal} onClose={setShowAddModal}>
                <div className="p-4">
                    <div className='flex items-center justify-between'>
                        <span>Add Jobs</span>
                        <button className='bg-red-200 rounded p-1 text-lg hover:bg-red-300 active:bg-red-200' onClick={() => setShowAddModal(false)}><RiCloseFill/></button>
                    </div>
                    <div className='p-4'>
                        <form action="">
                            <div className='flex'>
                                <InputLabel className={'w-[250px] pt-1'}>Nama Customer</InputLabel>
                                <div>
                                    <TextInput type="text" name="nama" required={true} />
                                    <InputError message={''} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
