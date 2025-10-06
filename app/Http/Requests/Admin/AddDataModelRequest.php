<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class AddDataModelRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nomor_inventaris' => 'required|string|max:255',
            'item_name' => 'required|string|max:255',
            'tipe' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'serial_number' => 'required|string|max:255',
            'tanggal_pembelian' => 'required|date',
            'akhir_garansi' => 'required|date',
            'lokasi' => 'required|string|max:255',
            'documents' => 'required|array',
            'documents.*' => 'file|mimes:pdf,jpg,jpeg,png',
        ];
    }


    public function messages(): array
    {
        return [
            'nomor_inventaris.required' => 'Nomor inventaris wajib diisi',
            'nomor_inventaris.unique' => 'Nomor inventaris sudah digunakan',
            'item_name.required' => 'Nama item wajib diisi',
            'tipe.required' => 'Tipe wajib dipilih',
            'tipe.exists' => 'Tipe tidak valid',
            'model.required' => 'Model wajib dipilih',
            'model.exists' => 'Model tidak valid',
            'serial_number.required' => 'Nomor seri wajib diisi',
            'tanggal_pembelian.required' => 'Tanggal pembelian wajib diisi',
            'tanggal_pembelian.date' => 'Tanggal pembelian tidak valid',
            'akhir_garansi.required' => 'Akhir garansi wajib diisi',
            'akhir_garansi.date' => 'Akhir garansi tidak valid',
            'lokasi.required' => 'Lokasi wajib dipilih',
            'lokasi.exists' => 'Lokasi tidak valid',
            'documents.required' => 'Dokumen wajib diunggah',
            'documents.array' => 'Dokumen tidak valid',
            'documents.*.file' => 'Setiap dokumen harus berupa file',
            'documents.*.mimes' => 'Dokumen harus berupa file dengan format: pdf, jpg, jpeg, png',
            'documents.*.max' => 'Ukuran dokumen maksimal 2MB',
            'akhir_garansi.after' => 'Akhir garansi harus setelah tanggal pembelian',
        ];
    }
}
