<?php

namespace App\Http\Controllers;

use App\Models\Manga;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Http;

class MangaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $string = '<html>' . $this->CURL("https://pojokmanga.net/komik/page/1") . '</html>';
        $eval = preg_replace("/\r\n|\n|\r/", '', $string);
        // while(!str_contains($string, 'Halaman')){
        // }
        $xml = simplexml_load_string($string);
        dd($xml);
        $chapters = [];
        $i = 0;
        foreach ($xml->li as $rl) {
            $chapters[$i]['href'] = $rl->a['href']->__toString();
            $chapters[$i]['number'] = preg_replace("/\r\n|\n|\r|Chapter /", '', $rl->a->__toString());
            $i++;
        }
        dd($chapters);
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
    public function show(manga $manga): Response
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(manga $manga): Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, manga $manga): RedirectResponse
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(manga $manga): RedirectResponse
    {
        //
    }
}
