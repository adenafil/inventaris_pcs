<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class AddAssignmentRequest extends FormRequest
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
            'asset_id' => 'required|exists:assets,id',
            'employee_id' => 'required_without:org_unit_id|nullable|exists:employees,id',
            'org_unit_id' => 'required_without:employee_id|nullable|exists:org_units,id',
            'notes' => 'nullable|string|max:500',
            'dokument_peminjaman' => 'nullable|file|mimes:pdf,jpg,jpeg,png',
            'status' => 'required|in:assigned,returned,lost',
            'assigned_at' => 'nullable|date',
            'returned_at' => 'nullable|date|after_or_equal:assigned_at',
        ];
    }
}
