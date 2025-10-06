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
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->string('inventory_number')->unique();
            $table->unsignedBigInteger('type_id');
            $table->unsignedBigInteger('model_id');
            $table->string('serial_number')->nullable();
            $table->string('item_name')->nullable();
            $table->date('purchase_date')->nullable();
            $table->year('purchase_year')->nullable();
            $table->date('warranty_expiration')->nullable();
            $table->string('status')->default('active');
            $table->unsignedBigInteger('location_id')->nullable();
            $table->timestamps();

            $table->foreign('type_id')->references('id')->on('data_types')->onDelete('cascade');
            $table->foreign('model_id')->references('id')->on('asset_models')->onDelete('cascade');
            $table->foreign('location_id')->references('id')->on('locations')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};
