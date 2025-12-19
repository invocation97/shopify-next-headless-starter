import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { IconShoppingCart } from "@tabler/icons-react";

export function CartEmpty() {
    return <Empty>
        <EmptyHeader>
            <EmptyMedia variant={"icon"} className="text-muted-foreground">
                <IconShoppingCart size={10} />
            </EmptyMedia>
            <EmptyTitle>
                Your cart is empty
            </EmptyTitle>
            <EmptyDescription>
                Your cart is empty. Add some items to get started.
            </EmptyDescription>
        </EmptyHeader>
    </Empty>
}