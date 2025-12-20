import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Product } from "@/lib/shopify/types/storefront.types";

type ProductFaqsProps = {
    product: Product;
};

type FAQ = {
    question: string;
    answer: string;
};

function parseFAQs(metafieldValue: string | null | undefined): FAQ[] {
    if (!metafieldValue) return [];

    try {
        const parsed = JSON.parse(metafieldValue);
        if (Array.isArray(parsed)) {
            return parsed.filter((item) => item.question && item.answer);
        }
    } catch {
        // If not JSON, try to parse as plain text or other formats
        return [];
    }

    return [];
}

export function ProductFaqs({ product }: ProductFaqsProps) {
    // Try to get FAQs from metafields
    const faqsMetafield = product.metafields?.find(
        (m) => m?.namespace === "custom" && m?.key === "faqs"
    );

    const faqs = parseFAQs(faqsMetafield?.value);

    if (faqs.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>
                            <p className="text-muted-foreground whitespace-pre-line">{faq.answer}</p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

