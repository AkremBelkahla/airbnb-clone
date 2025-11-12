/**
 * Listing section with horizontal carousel
 */

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { ListingCard } from "./ListingCard";
import type { Listing } from "@/lib/types";
import { useRef } from "react";

interface ListingSectionProps {
  title: string;
  listings: Listing[];
}

export function ListingSection({ title, listings }: ListingSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  if (listings.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="h-8 w-8 rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="h-8 w-8 rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="grid auto-cols-[calc((100%-6*1rem)/7)] grid-flow-col gap-4 overflow-x-auto scrollbar-hide pb-4 transition-all duration-300"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {listings.map((listing) => (
          <div key={listing.id} className="min-w-0">
            <ListingCard listing={listing} />
          </div>
        ))}
      </div>
    </section>
  );
}
