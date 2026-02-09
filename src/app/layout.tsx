import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Location Intelligence | Business Dashboard",
    description: "Advanced location intelligence and store performance analytics",
};

import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <DashboardLayout>
                    {children}
                </DashboardLayout>
            </body>
        </html>
    );
}
