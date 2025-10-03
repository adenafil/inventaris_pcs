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
            'pengguna' => 'required|string|max:255',
            'pegawai' => 'nullable|string|max:255',
            'bidang' => 'nullable|string|max:255',
            'tanggal_serah_terima' => 'nullable|date',
            'keterangan' => 'nullable|string',
            'documents' => 'required|array',
            'documents.*' => 'file|mimes:pdf,jpg,jpeg,png|max:2048',
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
            'akhir_garansi.after' => 'Akhir garansi harus setelah tanggal pembelian',
            'pegawai.required_if' => 'Pegawai wajib dipilih',
            'bidang.required_if' => 'Bidang wajib dipilih',
        ];
    }
}
