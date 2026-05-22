import EyeLogo from "./icons/EyeLogo";
import { IconBorder } from "./icons/Icon-border";

export default function Footer() {
    return (
        <footer className="w-full border-t border-text/20 py-6 text-sm text-text/70">
            <div className="mx-auto flex max-w-2xl items-center justify-center gap-4 px-6 text-left">
                <div className="flex items-center justify-center flex-col">
                    <p className="mb-1">© 2026 Carissimi Portfolio | Exploring everywhere, creating anywhere.</p>
                    <p>All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
