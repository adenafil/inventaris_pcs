import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Model',
        href: '/master/models',
    },
    {
        title: 'Add New Model',
        href: '/master/models/create',
    }
];

export default function Page() {
    const [formData, setFormData] = useState({
        tipe: '',
        brand: '',
        model: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = async () => {
        // Validate form
        if (!formData.tipe || !formData.brand || !formData.model) {
            alert('Please fill in all fields');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Saving model:', formData);
            setIsLoading(false);
        }, 1000);
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
                                    value={formData.tipe}
                                    onValueChange={(value) =>
                                        handleInputChange('tipe', value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select device type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Smartphone">
                                            Smartphone
                                        </SelectItem>
                                        <SelectItem value="Laptop">
                                            Laptop
                                        </SelectItem>
                                        <SelectItem value="Tablet">
                                            Tablet
                                        </SelectItem>
                                        <SelectItem value="Desktop">
                                            Desktop
                                        </SelectItem>
                                        <SelectItem value="Smartwatch">
                                            Smartwatch
                                        </SelectItem>
                                        <SelectItem value="Headphones">
                                            Headphones
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
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
                                    value={formData.brand}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'brand',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full"
                                />
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
                                    value={formData.model}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'model',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full"
                                />
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <Button
                                    onClick={handleSave}
                                    disabled={isLoading}
                                    className="flex items-center gap-2"
                                >
                                    <Save className="h-4 w-4" />
                                    {isLoading ? 'Saving...' : 'Save'}
                                </Button>
                                <Link href="/">
                                    <Button variant="outline">
                                        Back to List
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
