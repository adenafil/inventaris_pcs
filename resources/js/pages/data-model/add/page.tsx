import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react';
import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DataType } from '../_types';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Model',
        href: '/master/models',
    },
    {
        title: 'Add New Model',
        href: '/master/models/create',
    },
];

export default function Page({ types }: {
    types: DataType[];
}) {
    console.log({types});

    const formAddModel = useForm('post', '/master/models', {
        type_id: '',
        brand: '',
        model: '',
        details: '',
    });

    const handleSubmit = () => {
        formAddModel.submit({
            onSuccess: () => {
                router.visit('/master/models', {
                    method: 'get',
                    preserveState: true,
                    preserveScroll: true,
                });

                setTimeout(() => {
                    formAddModel.reset();
                    toast.success('Model added successfully!');
                }, 1000);
            },
            onValidationError: (errors) => {
                console.error('Validation errors:', errors);
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Lokasi" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Main Content */}
                <main className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <div className="">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            Form Data Model
                        </h1>
                        <p className="text-gray-600">
                            Manage your data models here. You can add, edit, or
                            delete models as needed.
                        </p>
                    </div>
                </main>

                <div className="max-w-8xl mx-auto w-full space-y-4 px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Model Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="tipe"
                                    className="text-sm font-medium"
                                >
                                    Type Model{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    value={formAddModel.data.type_id}
                                    onValueChange={(value) =>
                                        formAddModel.setData('type_id', value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select device type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {types.map((type) => (
                                            <SelectItem
                                                key={type.id}
                                                value={type.id.toString()}
                                            >
                                                {type.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {formAddModel.invalid('type_id') && (
                                    <p className="text-sm text-destructive">
                                        {formAddModel.errors.type_id}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="brand"
                                    className="text-sm font-medium"
                                >
                                    Brand Name{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="brand"
                                    placeholder="e.g., Samsung, Apple, Dell"
                                    value={formAddModel.data.brand}
                                    onChange={(e) =>
                                        formAddModel.setData(
                                            'brand',
                                            e.target.value,
                                        )
                                    }
                                    onBlur={() =>
                                        formAddModel.validate('brand')
                                    }
                                    className="w-full"
                                />
                                {formAddModel.invalid('brand') && (
                                    <p className="text-sm text-destructive">
                                        {formAddModel.errors.brand}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="model"
                                    className="text-sm font-medium"
                                >
                                    Model Name{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="model"
                                    placeholder="e.g., Galaxy S24, iPhone 15 Pro, XPS 13"
                                    value={formAddModel.data.model}
                                    onChange={(e) =>
                                        formAddModel.setData(
                                            'model',
                                            e.target.value,
                                        )
                                    }
                                    onBlur={() =>
                                        formAddModel.validate('model')
                                    }
                                    className="w-full"
                                />
                                {formAddModel.invalid('model') && (
                                    <p className="text-sm text-destructive">
                                        {formAddModel.errors.model}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <Button
                                    onClick={handleSubmit}
                                    disabled={formAddModel.processing}
                                    className="flex items-center gap-2"
                                >
                                    <Save className="h-4 w-4" />
                                    {formAddModel.processing
                                        ? 'Saving...'
                                        : 'Save'}
                                </Button>
                                <Link href="/master/models">
                                    <Button variant="outline">Back</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
