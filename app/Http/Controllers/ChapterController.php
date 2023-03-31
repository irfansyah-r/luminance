<?php

namespace App\Http\Controllers;

use App\Models\Manga;
use App\Models\Chapter;
use App\Models\Website;
use App\Models\Bookmark;
use App\Models\MangaWebsite;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;

class ChapterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $website = Website::where('name', 'PojokManga')->first();
        // $manga = Manga::where('title', 'Super Cube')->first();
        // $manga_website = MangaWebsite::where('manga_id', $manga->id)->where('website_id', $website->id)->first();

        $manga_websites = MangaWebsite::all();
        $info = [];

        foreach ($manga_websites as $manga_website) {
            $string = '<document>' . $this->CURL($manga_website->chapter_list_url) . '</document>';
            $xml = simplexml_load_string($string)?->div[1]->div->ul;
            $chapters = [];
            $i = 0;
            foreach ($xml->li as $item) {
                $chapters[$i]['manga_website_id'] = $manga_website->id;
                $chapters[$i]['number'] = preg_replace("/\r\n|\n|\r|Chapter /", '', $item->a->__toString());
                $chapters[$i]['url'] = $item->a['href']->__toString();
                $i++;
            }
            $last_chapter = Chapter::where('manga_website_id', $manga_website->id)->orderBy('id', 'desc')->first();
            if ($last_chapter !== null) {
                if ($chapters[0]['number'] === $last_chapter->number) {
                    continue;
                    // return response('There are no new chapters for this manga on this website.');
                }
            }
            $chapters = array_reverse($chapters);
            Chapter::insertOrIgnore($chapters);
            $info[] = $manga_website->manga->title . ' have an Update on !' . $manga_website->website->name;
        }
        if ($info === []) {
            return response('There are no new chapters for any manga on any website.');
        }
        $bookmark = Bookmark::with('manga_website.manga')->first();
        $bookmark->latest_chapter = $bookmark->manga_website->chapters->first()->number;
        $bookmark->save();
        $bookmarks = Bookmark::with('manga_website.manga')->get();
        // return inertia('Dashboard', compact('info', 'bookmarks'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Chapter $chapter): Response
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chapter $chapter): Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chapter $chapter): RedirectResponse
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chapter $chapter): RedirectResponse
    {
        //
    }
}
