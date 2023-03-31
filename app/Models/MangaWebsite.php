<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MangaWebsite extends Model
{
    use HasFactory;

    protected $fillable = [
        'website_id',
        'manga_id',
        'title',
        'chapter_list_url',
    ];

    public function website()
    {
        return $this->belongsTo(Website::class);
    }

    public function manga()
    {
        return $this->belongsTo(Manga::class);
    }

    public function bookmarks()
    {
        return $this->hasMany(Bookmark::class);
    }

    public function chapters()
    {
        return $this->hasMany(Chapter::class);
    }
}
