import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import ListBox from '@/Components/ListBox';

export default function Dashboard(props) {

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div>
                <ListBox
                    data={props.jobs}
                />
            </div>
        </AuthenticatedLayout>
    );
}
