<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('manga_websites', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('website_id')->unsigned();
            $table->bigInteger('manga_id')->unsigned();
            $table->string('title');
            $table->string('chapter_list_url');
            $table->foreign('website_id')->references('id')->on('websites');
            $table->foreign('manga_id')->references('id')->on('mangas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('manga_websites');
    }
};
