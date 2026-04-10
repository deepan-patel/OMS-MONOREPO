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
                <Link href="/"><Home className="hover:text-primary text-gray-500" /></Link>
                <Bell className="hover:text-primary w-9 h-9 text-gray-500" />
                <ThemeToggle />
                <ShoppingCartIcon />
                <Show when="signed-out">
                    <Link className={buttonVariants({ variant: "default", className: "hover:text-primary" })} href="/sign-in" >Sign In</Link>
                </Show>
                <Show when="signed-in">
                    {/* <UserButton /> */}
                    <ProfileButton />
                </Show>
            </div>

            {/* <div>
                <Show when="signed-out">
                    <SignInButton />
                    <SignUpButton>
                        <button className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                            Sign Up
                        </button>
                    </SignUpButton>
                </Show>
                <Show when="signed-in">
                    <UserButton />
                </Show>
            </div> */}

        </nav>
    )
}