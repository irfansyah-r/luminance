import React, { useState, useRef, useEffect } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { GrCheckmark } from 'react-icons/gr';
import { twMerge } from 'tailwind-merge';

export default function Selector({ placeholder, options, active, className, handleChange, prefix }) {
    const [selected, setSelected] = useState(active ? active : placeholder ? {value: null, label: placeholder} : options ? options[0] : {value: null, label: "Select Options"});
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("click", handleOutsideClick, false);
        return () => {
            document.removeEventListener("click", handleOutsideClick, false);
        };
    }, [open])

    return (
        <div className={twMerge(className, 'w-full')} ref={ref}>
            <div className="relative">
                {prefix}
                <div
                    className={twMerge(className, `${placeholder ? 'text-gray-500':''} w-full px-3 py-1 ${prefix && 'pl-8'} flex items-center justify-between cursor-default rounded bg-white active:outline outline-sky-400 dark:outline-sky-600 border`)}
                    onClick={(e) => setOpen(!open)}
                >
                    { selected?.label.length > 14 ? selected?.label.substring(0, 14) + "..." : selected?.label }
                    <div className="flex border-l-[2px] border-gray-300">
                        <BiChevronDown size={20} className={`${open && '-rotate-180'} transition-all duration-300'}`} />
                    </div>
                </div>
            </div>
            <ul
                className={twMerge(className, `w-full md:inset-x-auto inset-x-0 md:px-0 px-3 sm:px-11 bg-transparent absolute z-10 rounded mt-2 overflow-y-hidden transition-all ease-in-out duration-200 ${open ? 'max-h-72' : 'max-h-0'}`)}>
                <div className="w-full rounded overflow-x-hidden">{options ?
                    options.map((option, index) => (
                        <li key={index}
                            className={twMerge(className, `${selected === option && 'font-bold'} ${index == 0 && 'border-t-[1px]'} w-full py-1.5 px-3 bg-white cursor-pointer hover:bg-gray-200 flex items-center justify-between border-b-[1px] border-x-2`)}
                            onClick={() => {
                                setSelected(option)
                                handleChange(option.value)
                                setOpen(false)
                            }}
                        >
                            {option?.label} {selected === option && <GrCheckmark />}
                        </li>
                    )) :
                    <li className="p-2 text-sm hover:bg-sky-100 rounded">Empty</li>
                }
                </div>
            </ul>
        </div>
    );
}
