import { Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground mt-1">Configure your platform preferences and data connections.</p>
            </div>

            <div className="card max-w-2xl py-20 flex flex-col items-center justify-center text-center gap-4">
                <div className="p-4 bg-accent rounded-full text-muted-foreground">
                    <SettingsIcon size={48} />
                </div>
                <div>
                    <h2 className="text-xl font-bold">Configuration Workspace</h2>
                    <p className="text-muted-foreground max-w-sm mt-2">
                        Settings for user access, alert thresholds, and report automation are currently being localized for your region.
                    </p>
                </div>
            </div>
        </div>
    );
}
