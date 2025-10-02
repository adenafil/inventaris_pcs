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
        $role = Auth::user()->role;

        return $role === 'admin_it';
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
            'documents' => 'nullable|array',
            'documents.*' => 'file|mimes:pdf,jpg,jpeg,png|max:2048',
        ];
    }
}
