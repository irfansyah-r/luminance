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
        Schema::create('bookmarks', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('manga_website_id')->unsigned();
            $table->bigInteger('last_read_chapter');
            $table->bigInteger('latest_chapter');
            $table->string('status');
            $table->timestamps();
            $table->foreign('manga_website_id')->references('id')->on('manga_websites');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookmarks');
    }
};
