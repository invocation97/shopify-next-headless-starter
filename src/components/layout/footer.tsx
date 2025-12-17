import { IconBrandFacebook, IconBrandGithub, IconBrandInstagram, IconBrandLinkedin, IconBrandYoutube, IconBrandTwitter, IconBrandTiktok, IconBrandPinterest, IconBrandSnapchat } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { storeConfig } from "@/config/store";
import { Branding } from "@/lib/shopify/server/branding";
import { ComponentType } from "react";

function getSocialIcon(name: string): ComponentType<{ className?: string }> {
    switch (name.toLowerCase()) {
        case "facebook":
            return IconBrandFacebook;
        case "youtube":
            return IconBrandYoutube;
        case "instagram":
            return IconBrandInstagram;
        case "twitter":
        case "x":
            return IconBrandTwitter;
        case "linkedin":
            return IconBrandLinkedin;
        case "github":
            return IconBrandGithub;
        case "tiktok":
            return IconBrandTiktok;
        case "pinterest":
            return IconBrandPinterest;
        case "snapchat":
            return IconBrandSnapchat;
        default:
            return IconBrandGithub; // Default fallback
    }
}

export function Footer({ brand }: { brand: Branding }) {
    const socialLinks = storeConfig.branding.socialLinks;
    const footerLogo = brand.squareLogo?.image?.url ?? brand.logo?.image?.url ?? "";

    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col gap-8 md:flex-row md:justify-between">
                    {/* Logo */}
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center">
                            <Image
                                src={footerLogo}
                                alt={storeConfig.branding.name}
                                width={120}
                                height={120}
                                className="h-auto w-auto"
                            />
                        </Link>
                    </div>

                    {/* Links */}
                    <nav className="flex flex-col gap-4">
                        <div className="flex flex-wrap gap-8 md:gap-12">
                            {storeConfig.footerMenu.map((group, groupIndex) => (
                                <div key={groupIndex} className="flex flex-col gap-2">
                                    {group.header && (
                                        group.header.href ? (
                                            <Link
                                                href={group.header.href}
                                                className="text-sm font-semibold transition-opacity hover:opacity-75"
                                            >
                                                {group.header.label}
                                            </Link>
                                        ) : (
                                            <span className="text-sm font-semibold">
                                                {group.header.label}
                                            </span>
                                        )
                                    )}
                                    <ul className="flex flex-col gap-2">
                                        {group.links.map((link) => (
                                            <li key={link.label}>
                                                <Link
                                                    href={link.href}
                                                    className="text-sm font-medium transition-opacity hover:opacity-75"
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Social Media */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => {
                                const Icon = getSocialIcon(social.name);
                                return (
                                    <Link
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground transition-colors hover:text-foreground"
                                        aria-label={social.name}
                                    >
                                        <Icon className="size-5" />
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>
                </div>

                {/* Attribution */}
                <div className="mt-8 border-t pt-8">
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Made by</span>
                            <span className="font-medium text-foreground">
                                Danilo Benovic
                            </span>
                            <div className="flex items-center gap-2">
                                <Link
                                    href="https://github.com/invocation97"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                    aria-label="GitHub"
                                >
                                    <IconBrandGithub className="size-4" />
                                </Link>
                                <Link
                                    href="https://linkedin.com/in/danilo-benovic"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground transition-colors hover:text-foreground"
                                    aria-label="LinkedIn"
                                >
                                    <IconBrandLinkedin className="size-4" />
                                </Link>
                            </div>
                        </div>
                        <div className="text-center text-sm text-muted-foreground">
                            <p>&copy; {new Date().getFullYear()} {storeConfig.branding.name}. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}