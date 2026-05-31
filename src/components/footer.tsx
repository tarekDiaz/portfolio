import EyeLogo from "./icons/EyeLogo";
import { IconBorder } from "./icons/Icon-border";

export default function Footer() {
    return (
        <footer className="w-full border-t border-text/20 py-6 text-sm text-text3">
            <div className="mx-auto flex max-w-2xl items-center justify-center gap-4 px-6 text-left">
                <div className="flex items-center justify-center flex-col gap-2">
                    <p className="md:hidden block">© 2026 Carissimi Portfolio</p>
                    <p className="md:hidden block italic">Caught within the logic of art.</p>
                    <p className="hidden md:block">© 2026 Carissimi Portfolio | <span className="italic">Caught within the logic of art.</span></p>
                    <p>All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
