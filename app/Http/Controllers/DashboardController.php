<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Job;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\RedirectResponse;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keyword = $request->query('search');
        $page = $request->query('page') ?: 1;
        $jobs = Job::with(['services', 'createdBy', 'customer'])->when($keyword, function (Builder $query) use ($keyword) {
            $query->where('description', '~*', $keyword)
                ->orWhereRelation('createdBy', 'name', '~*', $keyword)
                ->orWhereRelation('services', 'name', '~*', $keyword)
                ->orWhereRelation('customer', 'name', '~*', $keyword);
        })->paginate(10);
        return Inertia::render('Dashboard', compact('jobs'));
        // return Inertia('Dashboard', compact('mangas'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
