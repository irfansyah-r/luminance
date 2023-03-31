import { Link } from '@inertiajs/react';
import { twMerge } from 'tailwind-merge'

export default function PrimaryButton({ type = 'submit', className = '', processing, children, onClick, href, props }) {
    return (
        <>
            {type === 'submit' ? (
                <button
                    type={type}
                    onClick={onClick}
                    href={href}
                    className={
                        `${twMerge("cursor-pointer inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-100 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-gray-200 focus:bg-gray-700 dark:focus:bg-gray-200 active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150", className)} ${
                            processing && 'opacity-25'
                        } `
                    }
                    disabled={processing}
                >
                    {children}
                </button>
            ) : (        
                <Link
                    type={type}
                    onClick={onClick}
                    href={href}
                    className={
                        `${twMerge("cursor-pointer inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150", className)} ${
                            processing && 'opacity-25'
                        } `
                    }
                    disabled={processing}
                    {...props}
                >
                    {children}
                </Link>
            )}
        </>
    );
}
