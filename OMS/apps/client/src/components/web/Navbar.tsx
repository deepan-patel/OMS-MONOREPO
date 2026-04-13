import Link from "next/link";
import { Bell, Home, ShoppingBag, ShoppingCart } from "lucide-react";
import { buttonVariants } from "../ui/button";
import SearchBar from "./SearchBar";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { ThemeToggle } from "../theme/ThemeToggle";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import ProfileButton from "./ProfileButton";

export default function NavBar() {
    return (
        <nav className="w-full flex justify-between items-center bg-accent p-5 mb-5 rounded-xl">
            <div className="flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 md:w-7 md:h-7" />
                <span className="text-bold tex-xl md:text-2xl tracking-wider ">OMS</span>
            </div>


            <div className="flex items-center gap-6">
                <SearchBar />
                <Link href="/"><Home className="hover:text-primary h-[1.2rem] w-[1.2rem] dark:text-white cursor-pointer text-foreground" /></Link>
                <Link href="/"><Bell className="hover:text-primary h-[1.2rem] w-[1.2rem] dark:text-white cursor-pointer text-foreground" /></Link>
                <ThemeToggle />
                <ShoppingCartIcon />
                <Show when="signed-out" >
                    <div className="flex items-center gap-2">
                        <Link className={buttonVariants({ variant: "secondary", className: "hover:text-primary" })} href="/sign-up" >Sign Up</Link>
                        <Link className={buttonVariants({ variant: "default", className: "hover:text-primary" })} href="/sign-in" >Sign In</Link>
                    </div>
                </Show>
                <Show when="signed-in">
                    <ProfileButton />
                </Show>
            </div>

        </nav >
    )
}