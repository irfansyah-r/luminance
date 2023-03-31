<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bookmark extends Model
{
    use HasFactory;

    protected $fillable = [
        'manga_website_id',
        'chapter',
        'url',
    ];

    public function manga_website()
    {
        return $this->belongsTo(MangaWebsite::class);
    }
}
