// app/page.tsx
'use client';

import Link from 'next/link';

export default function SimpleHomePage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-gray-800 text-white p-2 flex justify-between items-center text-sm">
                <span className="opacity-70">Amana Logo</span>
                <span className="opacity-70">Menu</span>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center py-12">
                <div className="max-w-md w-full space-y-8">
                    {/* Welcome Text */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Amana Transportation
                        </h2>
                        <p className="text-gray-600">
                            Choose where you'd like to go
                        </p>
                    </div>

                    <div className="space-y-4">

                        <Link
                            href="/requirement"
                            className="group block w-full bg-white border-2 border-blue-600 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-all duration-200 hover:bg-blue-50 hover:border-blue-700"
                        >
                            <div className="flex items-center justify-center space-x-3">
                                <h3 className="font-semibold text-gray-900 text-lg">First Version</h3>
                                <p className="text-gray-600 text-sm">As assignment Requirement</p>
                            </div>
                        </Link>

                        <Link
                            href="/improve" className="group block w-full bg-white border-2 border-green-600 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-all duration-200 hover:bg-green-50 hover:border-green-700"
                        >
                            <div className="flex items-center justify-center space-x-3">
                                <h3 className="font-semibold text-gray-900 text-lg">Second Version</h3>
                                <p className="text-gray-600 text-sm">Improving website</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-gray-400">
                            &copy; 2025 Amana Transportation. All rights reserved.
                        </p>
                        <p className="text-gray-400 mt-2">
                            Headquarters: Kuala Lumpur, Malaysia
                        </p>
                        <p className="text-gray-400 mt-1">
                            Founded: 2019
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}