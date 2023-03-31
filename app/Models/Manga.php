<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manga extends Model
{
    use HasFactory;

    protected $fillable = [
        'website_id',
        'title',
        'url',
        'chapter_url',
    ];

    public function websites()
    {
        return $this->belongsToMany(Website::class);
    }
}
