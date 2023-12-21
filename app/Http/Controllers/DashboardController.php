<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Manga;
use App\Models\Chapter;
use App\Models\Bookmark;
use App\Models\MangaWebsite;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\RedirectResponse;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookmarks = Bookmark::with('manga_website.manga')->get();
        return Inertia::render('Dashboard', compact('bookmarks'));
        // return Inertia('Dashboard', compact('mangas'));
    }

    public function cronChapters()
    {

        // $website = Website::where('name', 'PojokManga')->first();
        // $manga = Manga::where('title', 'Super Cube')->first();
        // $manga_website = MangaWebsite::where('manga_id', $manga->id)->where('website_id', $website->id)->first();

        $manga_websites = MangaWebsite::all();
        $info = [];

        foreach ($manga_websites as $manga_website) {
            $string = '<document>' . $this->CURL($manga_website->chapter_list_url) . '</document>';
            if (strpos($string, '<!DOCTYPE html>') !== false) {
                continue;
            }
            $xml = simplexml_load_string($string)?->div[1]->div->ul;
            $get_chapters = [];
            $i = 0;
            foreach ($xml->li as $item) {
                $get_chapters[$i]['manga_website_id'] = $manga_website->id;
                $get_chapters[$i]['number'] = trim(preg_replace("/\r\n|\n|\r|Chapter /", '', $item->a->__toString()));
                $get_chapters[$i]['url'] = $item->a['href']->__toString();
                $i++;
            }
            $chapters = Chapter::where('manga_website_id', $manga_website->id)->orderBy('id', 'desc')->get();
            $last_chapter = $chapters->first();
            if (!($last_chapter !== null && ($get_chapters[0]['number'] === $last_chapter->number))) {
                $get_chapters = array_reverse($get_chapters);
                if (count($get_chapters) > count($chapters) && count($chapters) !== 0) {
                    $get_chapters = array_slice($get_chapters, count($chapters), count($get_chapters));
                }
                Chapter::insertOrIgnore($get_chapters);
                // continue;
                // return response('There are no new chapters for this manga on this website.');
            }

            $bookmark = Bookmark::where('manga_website_id', $manga_website->id)->first();
            if ($bookmark !== null) {
                $chapters = Chapter::where('manga_website_id', $manga_website->id)->orderBy('id', 'desc')->get();
                $bookmark->latest_chapter = $chapters->first()->number;
                $bookmark->save();
            }
        }
        // if ($info === []) {
        //     return 'There are no new chapters for any manga on any website.';
        // }
        // return 'Bookmarks have been updated.';
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
