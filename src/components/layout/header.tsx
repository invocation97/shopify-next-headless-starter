"use client";

import { storeConfig } from "@/config/store";
import { Branding } from "@/lib/shopify/server/branding";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { IconShoppingCart, IconUser, IconSearch } from "@tabler/icons-react";

export function Header({ brand }: { brand: Branding }) {
    const router = useRouter();

    const renderMenuItem = (item: { label: string; href: string; items?: Array<{ label: string; href: string; items?: any[] }> }) => {
        if (item.items && item.items.length > 0) {
            return (
                <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger
                        onClick={(e) => {
                            // Navigate on click while preserving submenu hover behavior
                            router.push(item.href);
                        }}
                        className="cursor-pointer"
                    >
                        {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {item.items.map((subItem) => (
                                <li key={subItem.label}>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href={subItem.href}
                                        >
                                            <div className="text-sm font-medium leading-none">
                                                {subItem.label}
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            );
        }

        return (
            <NavigationMenuItem key={item.label}>
                <NavigationMenuLink asChild>
                    <Link
                        href={item.href}
                    >
                        {item.label}
                    </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
        );
    };

    return (
        <header className="sticky top-0 z-50 w-full">
            {/* Promotion Bar */}
            {storeConfig.promotionBar.enabled ? (
                <div className="w-full border-b bg-primary text-primary-foreground">
                    <div className="container mx-auto flex items-center justify-center px-4 py-2">
                        <Link
                            href={storeConfig.promotionBar.link}
                            className="text-sm font-medium hover:underline transition-opacity hover:opacity-80"
                        >
                            {storeConfig.promotionBar.message}
                        </Link>
                    </div>
                </div>
            ) : null}

            <div className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link href="/" className="flex shrink-0 items-center gap-2">
                        <Image
                            src={brand.logo?.image?.url ?? ""}
                            alt={brand.logo?.image?.altText ?? ""}
                            width={94}
                            height={18}
                            className="dark:invert"
                            style={{ width: "auto", height: "auto" }}
                        />
                    </Link>

                    <NavigationMenu>
                        <NavigationMenuList>
                            {storeConfig.headerMenu.map(renderMenuItem)}
                        </NavigationMenuList>
                    </NavigationMenu>

                    <div className="flex items-center gap-2">
                        <Button size="icon" variant="ghost" aria-label="Search">
                            <IconSearch className="size-5" />
                        </Button>
                        <Button size="icon" variant="ghost" aria-label="Account">
                            <IconUser className="size-5" />
                        </Button>
                        <Button size="icon" variant="ghost" aria-label="Shopping Cart">
                            <IconShoppingCart className="size-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}